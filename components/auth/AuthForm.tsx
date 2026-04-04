import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import AuthInput from "./AuthInput";

type AuthMode = "login" | "register";

type FormState = {
  name: string;
  email: string;
  password: string;
};

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (values: FormState) => Promise<void>;
}

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
};

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [generalError, setGeneralError] = useState("");
  const [generalSuccess, setGeneralSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  const content = useMemo(() => {
    if (isRegister) {
      return {
        title: "Create Account",
        subtitle: "Register with your name, email, and password.",
        submitText: loading ? "Creating account..." : "Register",
        footerText: "Already have an account?",
        footerLinkText: "Login",
        footerHref: "/account/login",
      };
    }

    return {
      title: "Login",
      subtitle: "Welcome back. Sign in to continue.",
      submitText: loading ? "Signing in..." : "Login",
      footerText: "Don’t have an account?",
      footerLinkText: "Register",
      footerHref: "/account/register",
    };
  }, [isRegister, loading]);

  const validate = useCallback(() => {
    const nextErrors: Partial<FormState> = {};

    if (isRegister && !form.name.trim()) {
      nextErrors.name = "Name is required.";
    } else if (isRegister && form.name.trim().length < 3) {
      nextErrors.name = "Name must be at least 3 characters.";
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
  }, [form, isRegister]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

      setGeneralError("");
      setGeneralSuccess("");
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setGeneralError("");
      setGeneralSuccess("");

      if (!validate()) return;

      try {
        setLoading(true);
        await onSubmit({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        });

        setGeneralSuccess(
          isRegister
            ? "Account created successfully. Check your email if confirmation is enabled."
            : "Login successful."
        );

        if (isRegister) {
          setForm(initialState);
        }
      } catch (error: any) {
        setGeneralError(error?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [form, isRegister, onSubmit, validate]
  );

  return (
    <main className="min-h-screen bg-white pt-32 px-4">
      <div className="max-w-md mx-auto rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-black">{content.title}</h1>
        <p className="text-neutral-600 mt-2">{content.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {isRegister && (
            <AuthInput
              id="name"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              disabled={loading}
              error={errors.name}
            />
          )}

          <AuthInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={loading}
            error={errors.email}
          />

          <AuthInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            autoComplete={isRegister ? "new-password" : "current-password"}
            disabled={loading}
            error={errors.password}
          />

          {generalError ? (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {generalError}
            </div>
          ) : null}

          {generalSuccess ? (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
              {generalSuccess}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="h-12 rounded-full bg-black text-white font-semibold transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {content.submitText}
          </button>
        </form>

        <div className="mt-6 text-sm text-neutral-600">
          {content.footerText}{" "}
          <Link
            href={content.footerHref}
            className="font-semibold text-black hover:underline"
          >
            {content.footerLinkText}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default React.memo(AuthForm);