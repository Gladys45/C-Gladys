import type { NextApiRequest, NextApiResponse } from "next";

const AUTH_COOKIE_NAME = "cupital_access_token";

function buildCookie(value: string, maxAge?: number) {
  const parts = [
    `${AUTH_COOKIE_NAME}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  if (typeof maxAge === "number") {
    parts.push(`Max-Age=${maxAge}`);
  }

  return parts.join("; ");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const accessToken = typeof req.body?.accessToken === "string" ? req.body.accessToken : "";

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: "Missing access token.",
      });
    }

    res.setHeader("Set-Cookie", buildCookie(accessToken, 60 * 60 * 24 * 7));

    return res.status(200).json({
      success: true,
    });
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", buildCookie("", 0));

    return res.status(200).json({
      success: true,
    });
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed.",
  });
}