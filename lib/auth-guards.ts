// import type { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";
// import { supabaseServer } from "@/lib/supabase-server";

// export type AppUserRole = "USER" | "ADMIN" | "AGENT";

// export type AppUser = {
//   id: string;
//   authUserId: string;
//   name: string;
//   email: string;
//   role: AppUserRole;
//   createdAt: Date;
//   updatedAt: Date;
// };

// const AUTH_COOKIE_NAME = "cupital_access_token";

// function parseCookies(cookieHeader?: string): Record<string, string> {
//   if (!cookieHeader) return {};

//   return cookieHeader.split(";").reduce<Record<string, string>>((acc, item) => {
//     const [rawKey, ...rawValue] = item.trim().split("=");
//     if (!rawKey) return acc;
//     acc[rawKey] = decodeURIComponent(rawValue.join("="));
//     return acc;
//   }, {});
// }

// export function getAccessTokenFromRequest(req: NextApiRequest | GetServerSidePropsContext["req"]) {
//   const authHeader = "headers" in req ? req.headers.authorization : undefined;
//   const bearerToken =
//     authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

//   if (bearerToken) return bearerToken;

//   const cookies = parseCookies(req.headers.cookie);
//   return cookies[AUTH_COOKIE_NAME] ?? null;
// }

// export async function getAuthenticatedAppUser(
//   req: NextApiRequest | GetServerSidePropsContext["req"]
// ): Promise<AppUser | null> {
//   const token = getAccessTokenFromRequest(req);

//   if (!token) return null;

//   const { data, error } = await supabaseServer.auth.getUser(token);

//   if (error || !data.user) return null;

//   const appUser = await prisma.user.findUnique({
//     where: { authUserId: data.user.id },
//     select: {
//       id: true,
//       authUserId: true,
//       name: true,
//       email: true,
//       role: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   return appUser ?? null;
// }

// export async function requireAdminApi(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<AppUser | null> {
//   const user = await getAuthenticatedAppUser(req);

//   if (!user) {
//     res.status(401).json({
//       success: false,
//       message: "Authentication required.",
//     });
//     return null;
//   }

//   if (user.role !== "ADMIN" && user.role !== "AGENT") {
//     res.status(403).json({
//       success: false,
//       message: "You are not allowed to access this resource.",
//     });
//     return null;
//   }

//   return user;
// }

// export async function requireAdminPage(
//   ctx: GetServerSidePropsContext
// ): Promise<GetServerSidePropsResult<{ currentUser: AppUser }>> {
//   const user = await getAuthenticatedAppUser(ctx.req);

//   if (!user) {
//     const next = encodeURIComponent(ctx.resolvedUrl || "/admin");
//     return {
//       redirect: {
//         destination: `/account/login?next=${next}`,
//         permanent: false,
//       },
//     };
//   }

//   if (user.role !== "ADMIN" && user.role !== "AGENT") {
//     return {
//       redirect: {
//         destination: "/account",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       currentUser: user,
//     },
//   };
// }

import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
  NextApiResponse,
} from "next";
import prisma from "@/lib/prisma";
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

function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce<Record<string, string>>((acc, item) => {
    const [rawKey, ...rawValue] = item.trim().split("=");
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rawValue.join("="));
    return acc;
  }, {});
}

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

export async function getAuthenticatedAppUser(
  req: NextApiRequest | GetServerSidePropsContext["req"]
): Promise<AppUser | null> {
  const token = getAccessTokenFromRequest(req);

  if (!token) return null;

  const { data, error } = await supabaseServer.auth.getUser(token);

  if (error || !data.user) return null;

  const appUser = await prisma.user.findUnique({
    where: { authUserId: data.user.id },
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

  return appUser ?? null;
}

function serializeAppUser(user: AppUser): SerializableAppUser {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

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

  if (user.role !== "ADMIN" && user.role !== "AGENT") {
    res.status(403).json({
      success: false,
      message: "You are not allowed to access this resource.",
    });
    return null;
  }

  return user;
}

export async function requireAdminPage(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ currentUser: SerializableAppUser }>> {
  const user = await getAuthenticatedAppUser(ctx.req);

  if (!user) {
    const next = encodeURIComponent(ctx.resolvedUrl || "/admin");
    return {
      redirect: {
        destination: `/account/login?next=${next}`,
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