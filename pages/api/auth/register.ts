// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";
// import { registerSchema } from "@/lib/validators/auth";
// import { supabaseServer } from "@/lib/supabase-server";
// import { supabaseAdmin } from "@/lib/supabase-admin";



// type ResponseData =
//   | {
//       success: true;
//       message: string;
//       requiresEmailConfirmation: boolean;
//     }
//   | {
//       success: false;
//       message: string;
//       fieldErrors?: Record<string, string[] | undefined>;
//     };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({
//       success: false,
//       message: "Method not allowed.",
//     });
//   }

//   const parsed = registerSchema.safeParse(req.body);

//   if (!parsed.success) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid form data.",
//       fieldErrors: parsed.error.flatten().fieldErrors,
//     });
//   }

//   const name = parsed.data.name.trim();
//   const email = parsed.data.email.trim().toLowerCase();
//   const password = parsed.data.password;

//   try {
//     const existing = await prisma.user.findUnique({
//       where: { email },
//       select: { id: true },
//     });

//     if (existing) {
//       return res.status(409).json({
//         success: false,
//         message: "An account with this email already exists.",
//       });
//     }

//     const { data, error } = await supabaseServer.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { name },
//         emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/account/login`,
//       },
//     });

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     const authUser = data.user;

//     if (!authUser?.id) {
//       return res.status(500).json({
//         success: false,
//         message: "Supabase did not return a user id.",
//       });
//     }

//     try {
//       await prisma.user.create({
//         data: {
//           authUserId: authUser.id,
//           name,
//           email,
//           role: "USER",
//         },
//       });
//     } catch {
//       await supabaseAdmin.auth.admin.deleteUser(authUser.id);

//       return res.status(500).json({
//         success: false,
//         message: "User auth was created but app profile failed. Changes rolled back.",
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       message: data.session
//         ? "Account created successfully."
//         : "Account created. Please verify your email before logging in.",
//       requiresEmailConfirmation: !data.session,
//     });
//   } catch {
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong while creating the account.",
//     });
//   }
// }



import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { registerSchema } from "@/lib/validators/auth";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type ResponseData =
  | {
      success: true;
      message: string;
      requiresEmailConfirmation: boolean;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid form data.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
  }

  const name = parsed.data.name.trim();
  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;

  try {
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const { data, error } = await supabaseServer.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/account/login`,
      },
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const authUser = data.user;

    if (!authUser?.id) {
      return res.status(500).json({
        success: false,
        message: "Supabase did not return a user id.",
      });
    }

    try {
      await prisma.user.create({
        data: {
          authUserId: authUser.id,
          name,
          email,
          // role is omitted on purpose
          // Prisma will use @default(USER)
        },
      });
    } catch {
      await supabaseAdmin.auth.admin.deleteUser(authUser.id);

      return res.status(500).json({
        success: false,
        message: "User auth was created but app profile failed. Changes rolled back.",
      });
    }

    return res.status(201).json({
      success: true,
      message: data.session
        ? "Account created successfully."
        : "Account created. Please verify your email before logging in.",
      requiresEmailConfirmation: !data.session,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the account.",
    });
  }
}