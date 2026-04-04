"use client";

import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

type ChipsInputProps = {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export default function ChipsInput({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter",
}: ChipsInputProps) {
  const [draft, setDraft] = useState("");

  const addChip = () => {
    const next = draft.trim();
    if (!next) return;
    if (value.includes(next)) {
      setDraft("");
      return;
    }
    onChange([...value, next]);
    setDraft("");
  };

  const removeChip = (chip: string) => {
    onChange(value.filter((item) => item !== chip));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-black">{label}</label>

      <div className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-3">
        <div className="flex flex-wrap gap-2">
          {value.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white"
            >
              {chip}
              <button type="button" onClick={() => removeChip(chip)}>
                <HiOutlineXMark className="text-sm" />
              </button>
            </span>
          ))}
        </div>

        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addChip();
            }
          }}
          onBlur={addChip}
          placeholder={placeholder}
          className="mt-2 h-10 w-full bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}