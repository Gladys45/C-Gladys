

// import type { NextPage } from "next";
// import AuthCard from "../../components/auth/AuthCard";

// const RegisterPage: NextPage = () => {
//   return <AuthCard mode="register" />;
// };

// export default RegisterPage;


import type { NextPage } from "next";
import { useRouter } from "next/router";
import AuthCard from "../../components/auth/AuthCard";

const RegisterPage: NextPage = () => {
  const router = useRouter();

  return (
    <AuthCard
      mode="register"
      onSubmit={async ({ name, email, password }) => {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          return {
            success: false,
            message: data.message || "Registration failed.",
            fieldErrors: data.fieldErrors
              ? {
                  name: data.fieldErrors.name?.[0],
                  email: data.fieldErrors.email?.[0],
                  password: data.fieldErrors.password?.[0],
                }
              : undefined,
          };
        }

        if (!data.requiresEmailConfirmation) {
          router.push("/account/login");
        }

        return {
          success: true,
          message: data.message || "Account created successfully.",
        };
      }}
    />
  );
};

export default RegisterPage;