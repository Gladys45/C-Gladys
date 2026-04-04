
import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminApi } from "@/lib/auth-guards";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await requireAdminApi(req, res);
  if (!currentUser) return;

  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Protected admin properties endpoint.",
      currentUser: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
      },
      data: [],
    });
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed.",
  });
}