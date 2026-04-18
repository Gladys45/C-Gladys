"use client";
import { useState } from "react";

interface DownloadFormProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  reason: string;
}

export default function DownloadForm({ onSubmit, onClose }: DownloadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full items-center">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none focus:border-primary"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none focus:border-primary"
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none focus:border-primary"
        required
      />
      <div className="border border-[#CCCCCC] text-[#757575] w-full py-2 px-3 rounded-sm outline-none focus-within:border-primary">
        <select
          className="w-full outline-none bg-transparent"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        >
          <option value="" disabled>Reason for download</option>
          <option value="invest">I want to invest in Rwanda</option>
          <option value="rentals">I need long term rentals in Rwanda</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-fit bg-primary py-3 text-lg rounded-sm px-6 text-white mt-5 hover:bg-primary/90 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}