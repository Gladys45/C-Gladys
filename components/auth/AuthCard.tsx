

// import Link from "next/link";
// import { FormEvent, useState } from "react";
// import AuthInput from "./AuthInput";

// type AuthMode = "login" | "register";

// interface AuthCardProps {
//   mode: AuthMode;
// }

// type FormState = {
//   name: string;
//   email: string;
//   password: string;
// };

// type FormErrors = Partial<FormState>;

// const initialForm: FormState = {
//   name: "",
//   email: "",
//   password: "",
// };

// export default function AuthCard({ mode }: AuthCardProps) {
//   const isRegister = mode === "register";

//   const [form, setForm] = useState<FormState>(initialForm);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [submitted, setSubmitted] = useState(false);

//   const title = isRegister ? "Create Account" : "Login";
//   const subtitle = isRegister
//     ? "Register with your name, email, and password."
//     : "Enter your email and password to continue.";
//   const buttonText = isRegister ? "Register" : "Login";
//   const footerText = isRegister
//     ? "Already have an account?"
//     : "Don’t have an account?";
//   const footerLinkText = isRegister ? "Login" : "Register";
//   const footerLinkHref = isRegister ? "/account/login" : "/account/register";

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));

//     setSubmitted(false);
//   };

//   const validateForm = () => {
//     const nextErrors: FormErrors = {};

//     if (isRegister) {
//       if (!form.name.trim()) {
//         nextErrors.name = "Name is required.";
//       } else if (form.name.trim().length < 3) {
//         nextErrors.name = "Name must be at least 3 characters.";
//       }
//     }

//     if (!form.email.trim()) {
//       nextErrors.email = "Email is required.";
//     } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
//       nextErrors.email = "Enter a valid email address.";
//     }

//     if (!form.password) {
//       nextErrors.password = "Password is required.";
//     } else if (form.password.length < 6) {
//       nextErrors.password = "Password must be at least 6 characters.";
//     }

//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const isValid = validateForm();
//     setSubmitted(isValid);
//   };

//   return (
//     <main className="min-h-screen bg-[#FAFAFA] pt-32 px-4">
//       <div className="max-w-md mx-auto">
//         <div className="rounded-[28px] border border-neutral-200 bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
//           <div className="mb-6">
//             <h1 className="text-3xl sm:text-4xl font-bold text-black">
//               {title}
//             </h1>
//             <p className="mt-2 text-neutral-600 text-sm sm:text-base">
//               {subtitle}
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             {isRegister ? (
//               <AuthInput
//                 id="name"
//                 name="name"
//                 label="Full Name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={form.name}
//                 onChange={handleChange}
//                 error={errors.name}
//               />
//             ) : null}

//             <AuthInput
//               id="email"
//               name="email"
//               label="Email"
//               type="email"
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={handleChange}
//               error={errors.email}
//             />

//             <AuthInput
//               id="password"
//               name="password"
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={handleChange}
//               error={errors.password}
//             />

//             <button
//               type="submit"
//               className="mt-2 h-12 rounded-full bg-black text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg"
//             >
//               {buttonText}
//             </button>
//           </form>

//           {submitted ? (
//             <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//               {isRegister
//                 ? "Registration form is ready for backend integration."
//                 : "Login form is ready for backend integration."}
//             </div>
//           ) : null}

//           <div className="mt-6 text-sm text-neutral-600">
//             {footerText}{" "}
//             <Link
//               href={footerLinkHref}
//               className="font-semibold text-black hover:underline"
//             >
//               {footerLinkText}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

import Link from "next/link";
import { FormEvent, useState } from "react";

type AuthMode = "login" | "register";

interface AuthCardProps {
  mode: AuthMode;
  onSubmit: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{
    success: boolean;
    message?: string;
    fieldErrors?: Partial<Record<"name" | "email" | "password", string>>;
  }>;
}

import AuthInput from "./AuthInput";

type FormState = {
  name: string;
  email: string;
  password: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  password: "",
};

export default function AuthCard({ mode, onSubmit }: AuthCardProps) {
  const isRegister = mode === "register";

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const title = isRegister ? "Create Account" : "Login";
  const subtitle = isRegister
    ? "Register with your name, email, and password."
    : "Enter your email and password to continue.";
  const buttonText = loading
    ? isRegister
      ? "Creating..."
      : "Signing in..."
    : isRegister
    ? "Register"
    : "Login";
  const footerText = isRegister
    ? "Already have an account?"
    : "Don’t have an account?";
  const footerLinkText = isRegister ? "Login" : "Register";
  const footerLinkHref = isRegister ? "/account/login" : "/account/register";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
    setServerMessage("");
  };

  const validateForm = () => {
    const nextErrors: Partial<FormState> = {};

    if (isRegister) {
      if (!form.name.trim()) {
        nextErrors.name = "Name is required.";
      } else if (form.name.trim().length < 3) {
        nextErrors.name = "Name must be at least 3 characters.";
      }
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setServerError("");
    setServerMessage("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const result = await onSubmit({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (result.fieldErrors) {
        setErrors((prev) => ({
          ...prev,
          ...result.fieldErrors,
        }));
      }

      if (!result.success) {
        setServerError(result.message || "Something went wrong.");
        return;
      }

      setServerMessage(result.message || "Success.");

      if (isRegister) {
        setForm(initialForm);
      }
    } catch (error: any) {
      setServerError(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 px-4">
      <div className="max-w-md mx-auto">
        <div className="rounded-[28px] border border-neutral-200 bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-black">
              {title}
            </h1>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base">
              {subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister ? (
              <AuthInput
                id="name"
                name="name"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                disabled={loading}
              />
            ) : null}

            <AuthInput
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
            />

            <AuthInput
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              disabled={loading}
            />

            {serverError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            ) : null}

            {serverMessage ? (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {serverMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-12 rounded-full bg-black text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {buttonText}
            </button>
          </form>

          <div className="mt-6 text-sm text-neutral-600">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-semibold text-black hover:underline"
            >
              {footerLinkText}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}