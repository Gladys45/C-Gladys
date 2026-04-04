"use client";

import { formatFileSize } from "@/lib/utils/property";
import { HiOutlineTrash } from "react-icons/hi2";

type FilePickerProps = {
  label: string;
  accept: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
  helperText?: string;
};

export default function FilePicker({
  label,
  accept,
  multiple = false,
  files,
  onChange,
  helperText,
}: FilePickerProps) {
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    onChange(multiple ? [...files, ...selected] : selected.slice(0, 1));
    e.target.value = "";
  };

  const removeAt = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-black">{label}</label>

      <div className="rounded-2xl border border-dashed border-neutral-300 bg-[#FAFAFA] p-4">
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleSelect}
          className="block w-full text-sm"
        />

        {helperText ? <p className="mt-2 text-xs text-neutral-500">{helperText}</p> : null}

        {files.length > 0 ? (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-black">{file.name}</p>
                  <p className="text-xs text-neutral-500">
                    {file.type || "Unknown type"} • {formatFileSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600"
                >
                  <HiOutlineTrash className="text-base" />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}