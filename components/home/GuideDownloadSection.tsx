"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type GuideOption = { label: string; value: string };

type GuideDownloadSectionProps = {
  id?: string;
  imageSrc: string;
  imageAlt?: string;
  leftText: string[];
  title: string; // form title
  options: GuideOption[];
  onSubmit?: (data: { name: string; email: string; reason: string; phone: string }) => void | Promise<void>;
};

export default function GuideDownloadSection({
  id = "our_story_two",
  imageSrc,
  imageAlt = "",
  leftText,
  title,
  options,
  onSubmit,
}: GuideDownloadSectionProps) {
  const defaultReason = useMemo(() => options[0]?.value ?? "", [options]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: "",
    phone: "",
  });

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const handleSubmit = async () => {
    // minimal validation (you can expand)
    if (!form.name || !form.email || !form.reason || !form.phone) return;
    await onSubmit?.(form);
  };

  return (
    <section id={id}>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-20 my-32 px-6">
        <div className="m-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <picture>
              <img src={imageSrc} alt={imageAlt} className="rounded-sm" width={450} />
            </picture>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8">
          {leftText.map((p, idx) => (
            <p key={idx} className="text-xl">
              {p}
            </p>
          ))}

          <h5 className="text-center text-primary text-xl">{title}</h5>

          <div className="flex flex-col gap-2">
            <input
              value={form.name}
              onChange={handleChange("name")}
              type="text"
              placeholder="Name"
              className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
            />
            <input
              value={form.email}
              onChange={handleChange("email")}
              type="text"
              placeholder="Email"
              className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
            />

            <div className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none">
              <select
                className="w-full outline-none bg-transparent"
                value={form.reason}
                onChange={handleChange("reason")}
              >
                <option disabled value="">
                  Reason for download
                </option>
                {/* If you want default selection, set form.reason initially */}
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <input
              value={form.phone}
              onChange={handleChange("phone")}
              type="text"
              placeholder="Phone Number"
              className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none"
            />

            <button
              type="button"
              onClick={handleSubmit}
              className="w-fit bg-primary py-3 text-lg rounded-sm px-6 text-white mt-5"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}