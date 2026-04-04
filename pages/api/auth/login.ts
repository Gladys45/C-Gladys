import { supabaseServer } from "@/lib/supabase-server";
import { loginSchema } from "@/lib/validators/auth";
import type { NextApiRequest, NextApiResponse } from "next";
// import { supabaseServer } from "../../../lib/supabase-server";
// import { loginSchema } from "../../../lib/validators/auth";

type ResponseData =
  | {
      success: true;
      message: string;
      session: unknown;
      user: unknown;
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

  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid form data.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
  }

  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;

  try {
    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      session: data.session,
      user: data.user,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in.",
    });
  }
}