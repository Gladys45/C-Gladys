

// import classNames from "classnames";
// import React from "react";

// interface AuthInputProps {
//   id: string;
//   name: string;
//   label: string;
//   type?: "text" | "email" | "password";
//   placeholder?: string;
//   value: string;
//   error?: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export default function AuthInput({
//   id,
//   name,
//   label,
//   type = "text",
//   placeholder,
//   value,
//   error,
//   onChange,
// }: AuthInputProps) {
//   return (
//     <div className="flex flex-col gap-2">
//       <label htmlFor={id} className="text-sm font-semibold text-neutral-800">
//         {label}
//       </label>

//       <input
//         id={id}
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         className={classNames(
//           "h-12 w-full rounded-xl border px-4 outline-none transition-all duration-200 bg-white",
//           error
//             ? "border-red-500 focus:border-red-500"
//             : "border-neutral-300 focus:border-black"
//         )}
//       />

//       {error ? <p className="text-sm text-red-600">{error}</p> : null}
//     </div>
//   );
// }


import classNames from "classnames";
import React from "react";

interface AuthInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  error,
  disabled = false,
  onChange,
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-neutral-800">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={classNames(
          "h-12 w-full rounded-xl border px-4 outline-none transition-all duration-200 bg-white",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-neutral-300 focus:border-black",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}