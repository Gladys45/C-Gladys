

// import type { NextPage } from "next";
// import { useRouter } from "next/router";
// import AuthCard from "../../components/auth/AuthCard";
// import { supabaseBrowser } from "@/lib/supabase-browser";

// type MeResponse =
//   | {
//       success: true;
//       user: {
//         id: string;
//         authUserId: string;
//         name: string;
//         email: string;
//         role: "USER" | "ADMIN" | "AGENT";
//       };
//     }
//   | {
//       success: false;
//       message: string;
//     };

// function getSafeNext(nextValue: string | string[] | undefined): string {
//   const fallback = "/";

//   if (!nextValue || Array.isArray(nextValue)) return fallback;
//   if (!nextValue.startsWith("/")) return fallback;
//   if (nextValue.startsWith("//")) return fallback;

//   return nextValue;
// }

// const LoginPage: NextPage = () => {
//   const router = useRouter();

//   return (
//     <AuthCard
//       mode="login"
//       onSubmit={async ({ email, password }) => {
//         const next = getSafeNext(router.query.next);

//         const { data, error } = await supabaseBrowser.auth.signInWithPassword({
//           email,
//           password,
//         });

//         if (error) {
//           return {
//             success: false,
//             message: error.message || "Login failed.",
//           };
//         }

//         if (!data.session?.access_token) {
//           return {
//             success: false,
//             message: "Login failed. No active session was created.",
//           };
//         }

//         const meResponse = await fetch("/api/auth/me", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${data.session.access_token}`,
//           },
//         });

//         const meData: MeResponse = await meResponse.json();

//         if (!meResponse.ok || !meData.success) {
//           await supabaseBrowser.auth.signOut();

//           return {
//             success: false,
//             message:
//               "Login succeeded, but your profile could not be loaded.",
//           };
//         }

//         const role = meData.user.role;

//         if (role === "ADMIN" || role === "AGENT") {
//           await router.push("/admin");
//           return {
//             success: true,
//             message: "Login successful.",
//           };
//         }

//         await router.push(next);
//         return {
//           success: true,
//           message: "Login successful.",
//         };
//       }}
//     />
//   );
// };

// export default LoginPage;


import type { NextPage } from "next";
import { useRouter } from "next/router";
import AuthCard from "../../components/auth/AuthCard";
import { supabaseBrowser } from "@/lib/supabase-browser";

type MeResponse =
  | {
      success: true;
      user: {
        id: string;
        authUserId: string;
        name: string;
        email: string;
        role: "USER" | "ADMIN" | "AGENT";
      };
    }
  | {
      success: false;
      message: string;
    };

function getSafeNext(nextValue: string | string[] | undefined): string {
  if (!nextValue || Array.isArray(nextValue)) return "/";
  if (!nextValue.startsWith("/")) return "/";
  if (nextValue.startsWith("//")) return "/";
  return nextValue;
}

const LoginPage: NextPage = () => {
  const router = useRouter();

  return (
    <AuthCard
      mode="login"
      onSubmit={async ({ email, password }) => {
        const next = getSafeNext(router.query.next);

        const { data, error } = await supabaseBrowser.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return {
            success: false,
            message: error.message || "Login failed.",
          };
        }

        const accessToken = data.session?.access_token;

        if (!accessToken) {
          return {
            success: false,
            message: "Login failed. No active session was created.",
          };
        }

        await fetch("/api/auth/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken,
          }),
        });

        const meResponse = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const meData: MeResponse = await meResponse.json();

        if (!meResponse.ok || !meData.success) {
          await supabaseBrowser.auth.signOut();
          await fetch("/api/auth/session", { method: "DELETE" });

          return {
            success: false,
            message: "Login succeeded, but your profile could not be loaded.",
          };
        }

        const role = meData.user.role;

        if (role === "ADMIN" || role === "AGENT") {
          await router.push("/admin");
          return {
            success: true,
            message: "Login successful.",
          };
        }

        await router.push(next);
        return {
          success: true,
          message: "Login successful.",
        };
      }}
    />
  );
};

export default LoginPage;