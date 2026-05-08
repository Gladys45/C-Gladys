import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";
import { supabaseServer } from "@/lib/supabase-server";

export type AppUserRole = "USER" | "ADMIN" | "AGENT";

export type AppUser = {
  id: string;
  authUserId: string;
  name: string;
  email: string;
  role: AppUserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type SerializableAppUser = {
  id: string;
  authUserId: string;
  name: string;
  email: string;
  role: AppUserRole;
  createdAt: string;
  updatedAt: string;
};

const AUTH_COOKIE_NAME = "cupital_access_token";

/* ---------------- COOKIE PARSER ---------------- */
function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce<Record<string, string>>((acc, item) => {
    const [key, ...val] = item.trim().split("=");
    if (!key) return acc;
    acc[key] = decodeURIComponent(val.join("="));
    return acc;
  }, {});
}

/* ---------------- TOKEN ---------------- */
export function getAccessTokenFromRequest(
  req: NextApiRequest | GetServerSidePropsContext["req"]
) {
  const authHeader = "headers" in req ? req.headers.authorization : undefined;

  const bearerToken =
    authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (bearerToken) return bearerToken;

  const cookies = parseCookies(req.headers.cookie);
  return cookies[AUTH_COOKIE_NAME] ?? null;
}

/* ---------------- USER CACHE (IMPORTANT FIX) ---------------- */
const userCache = new Map<string, AppUser>();

export async function getAuthenticatedAppUser(
  req: NextApiRequest | GetServerSidePropsContext["req"]
): Promise<AppUser | null> {
  const token = getAccessTokenFromRequest(req);

  if (!token) return null;

  // Check if database is configured
  if (!isDatabaseConfigured) {
    console.warn("Database not configured. Cannot authenticate user.");
    return null;
  }

  // Supabase validation (fast, external auth)
  const { data, error } = await supabaseServer.auth.getUser(token);

  if (error || !data.user) return null;

  const authUserId = data.user.id;

  // CACHE CHECK (performance boost)
  const cached = userCache.get(authUserId);
  if (cached) return cached;

  // Get prisma client
  const prisma = await getPrisma();
  if (!prisma) {
    console.warn("Failed to initialize Prisma. Cannot authenticate user.");
    return null;
  }

  // DB lookup only if not cached
  const appUser = await prisma.user.findUnique({
    where: { authUserId },
    select: {
      id: true,
      authUserId: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (appUser) {
    userCache.set(authUserId, appUser);
  }

  return appUser ?? null;
}

/* ---------------- SERIALIZER ---------------- */
function serializeAppUser(user: AppUser): SerializableAppUser {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

/* ---------------- API GUARD ---------------- */
export async function requireAdminApi(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<AppUser | null> {
  const user = await getAuthenticatedAppUser(req);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return null;
  }

  if (user.role === "ADMIN" || user.role === "AGENT") {
    return user;
  }

  res.status(403).json({
    success: false,
    message: "Forbidden.",
  });

  return null;
}

/* ---------------- PAGE GUARD ---------------- */
export async function requireAdminPage(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ currentUser: SerializableAppUser }>> {
  const user = await getAuthenticatedAppUser(ctx.req);

  if (!user) {
    return {
      redirect: {
        destination: `/account/login?next=${encodeURIComponent(ctx.resolvedUrl || "/")}`,
        permanent: false,
      },
    };
  }

  if (user.role !== "ADMIN" && user.role !== "AGENT") {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentUser: serializeAppUser(user),
    },
  };
}
