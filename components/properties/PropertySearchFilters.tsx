import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import {
  MarketType,
  PropertyKind,
  PropertyPurpose,
  RentType,
} from "@/lib/generated/prisma";

type PropertySearchFiltersProps = {
  initialValues: {
    search: string;
    purpose: string;
    marketType: string;
    rentType: string;
    kind: string;
    minPrice: string;
    maxPrice: string;
  };
};

export default function PropertySearchFilters({
  initialValues,
}: PropertySearchFiltersProps) {
  const router = useRouter();

  const [form, setForm] = useState(initialValues);

  function updateField(name: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const query: Record<string, string> = {};

    Object.entries(form).forEach(([key, value]) => {
      if (value.trim()) {
        query[key] = value.trim();
      }
    });

    router.push({
      pathname: "/",
      query,
    });
  }

  function handleReset() {
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4"
    >
      <div className="md:col-span-2 xl:col-span-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Search by title or location
        </label>
        <input
          type="text"
          value={form.search}
          onChange={(e) => updateField("search", e.target.value)}
          placeholder="Search by Kigali, Gasabo, house, land..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Purpose</label>
        <select
          value={form.purpose}
          onChange={(e) => updateField("purpose", e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        >
          <option value="">All</option>
          {Object.values(PropertyPurpose).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Market Type</label>
        <select
          value={form.marketType}
          onChange={(e) => updateField("marketType", e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        >
          <option value="">All</option>
          {Object.values(MarketType).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Rent Type</label>
        <select
          value={form.rentType}
          onChange={(e) => updateField("rentType", e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        >
          <option value="">All</option>
          {Object.values(RentType).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Property Type</label>
        <select
          value={form.kind}
          onChange={(e) => updateField("kind", e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        >
          <option value="">All</option>
          {Object.values(PropertyKind).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Min Price</label>
        <input
          type="number"
          value={form.minPrice}
          onChange={(e) => updateField("minPrice", e.target.value)}
          placeholder="0"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Max Price</label>
        <input
          type="number"
          value={form.maxPrice}
          onChange={(e) => updateField("maxPrice", e.target.value)}
          placeholder="100000"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div className="flex items-end gap-3">
        <button
          type="submit"
          className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700"
        >
          Reset
        </button>
      </div>
    </form>
  );
}