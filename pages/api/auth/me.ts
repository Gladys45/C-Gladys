


// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";
// import { supabaseServer } from "@/lib/supabase-server";

// type AppUserRole = "USER" | "ADMIN" | "AGENT";

// type ResponseData =
//   | {
//       success: true;
//       user: {
//         id: string;
//         authUserId: string;
//         name: string;
//         email: string;
//         role: AppUserRole;
//         createdAt: Date;
//         updatedAt: Date;
//       };
//     }
//   | {
//       success: false;
//       message: string;
//     };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   if (req.method !== "GET") {
//     return res.status(405).json({
//       success: false,
//       message: "Method not allowed.",
//     });
//   }

//   const authHeader = req.headers.authorization;
//   const token =
//     authHeader?.startsWith("Bearer ")
//       ? authHeader.slice(7)
//       : null;

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Missing access token.",
//     });
//   }

//   try {
//     const { data, error } = await supabaseServer.auth.getUser(token);

//     if (error || !data.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid or expired token.",
//       });
//     }

//     const appUser = await prisma.user.findUnique({
//       where: { authUserId: data.user.id },
//       select: {
//         id: true,
//         authUserId: true,
//         name: true,
//         email: true,
//         role: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     if (!appUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User profile not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       user: appUser,
//     });
//   } catch {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to load current user.",
//     });
//   }
// }




import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedAppUser } from "@/lib/auth-guards";

type ResponseData =
  | {
      success: true;
      user: {
        id: string;
        authUserId: string;
        name: string;
        email: string;
        role: "USER" | "ADMIN" | "AGENT";
        createdAt: Date;
        updatedAt: Date;
      };
    }
  | {
      success: false;
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const user = await getAuthenticatedAppUser(req);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to load current user.",
    });
  }
}