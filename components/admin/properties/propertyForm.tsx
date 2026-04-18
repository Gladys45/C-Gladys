

import { FormEvent, useMemo, useState } from "react";

type PropertyFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = {
  title: string;
  slug: string;
  description: string;
  kind: "HOUSE" | "LAND";
  purpose: "SELL" | "BUY" | "RENT" | "LETTINGS";
  marketType: "ON_MARKET" | "OFF_MARKET" | "OFF_PLAN" | "ON_PLAN",
  // marketType: "ON_MARKET" | "OFF_MARKET";
  status: "DRAFT" | "ACTIVE" | "PENDING" | "SOLD" | "RENTED" | "ARCHIVED";
  visibility: "PUBLIC" | "PRIVATE" | "HIDDEN";
  rentType: "" | "LONG_TERM" | "SHORT_STAY";
  priceAmount: string;
  priceCurrency: "" | "RWF" | "USD" | "EUR" | "GBP";

  country: string;
  city: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;

  bedrooms: string;
  bathrooms: string;
  plotSizeSqm: string;
  highlights: string;

  imageTitle: string;
  imageAltText: string;
  imageCaption: string;
  imageCategory:
    | "COVER"
    | "GALLERY"
    | "INTERIOR"
    | "EXTERIOR"
    | "BEDROOM"
    | "BATHROOM"
    | "KITCHEN"
    | "LIVING_ROOM"
    | "DINING"
    | "AMENITY"
    | "MAP"
    | "OTHER";
  isCoverImage: boolean;
  imageIsPublic: boolean;

  videoTitle: string;
  videoCaption: string;
  isPrimaryVideo: boolean;
  videoIsPublic: boolean;

  documentTitle: string;
  documentCaption: string;
  documentKind: "BROCHURE" | "FLOOR_PLAN" | "TITLE_DEED" | "OTHER";
  isDownloadable: boolean;
  documentIsPublic: boolean;
};

type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  property?: T;
  media?: unknown[];
  data?: T;
};

const initialState: FormState = {
  title: "",
  slug: "",
  description: "",
  kind: "HOUSE",
  purpose: "SELL",
  marketType: "ON_MARKET",
  status: "DRAFT",
  visibility: "PUBLIC",
  rentType: "",
  priceAmount: "",
  priceCurrency: "RWF",

  country: "Rwanda",
  city: "",
  province: "",
  district: "",
  sector: "",
  cell: "",
  village: "",
  addressLine1: "",
  addressLine2: "",
  postalCode: "",

  bedrooms: "",
  bathrooms: "",
  plotSizeSqm: "",
  highlights: "",

  imageTitle: "",
  imageAltText: "",
  imageCaption: "",
  imageCategory: "GALLERY",
  isCoverImage: false,
  imageIsPublic: true,

  videoTitle: "",
  videoCaption: "",
  isPrimaryVideo: true,
  videoIsPublic: true,

  documentTitle: "",
  documentCaption: "",
  documentKind: "BROCHURE",
  isDownloadable: true,
  documentIsPublic: true,
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function safeJson<T>(res: Response): Promise<T> {
  const text = await res.text();

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(text || "API returned invalid JSON.");
  }
}

export default function PropertyForm({ isOpen, onClose }: PropertyFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLand = useMemo(() => form.kind === "LAND", [form.kind]);

  if (!isOpen) return null;

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(initialState);
    setImageFiles([]);
    setVideoFile(null);
    setDocumentFile(null);
    setLoading(false);
    setError("");
    setSuccess("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("slug", form.slug ? slugify(form.slug) : slugify(form.title));
      formData.append("description", form.description.trim());

      formData.append("kind", form.kind);
      formData.append("purpose", form.purpose);
      formData.append("marketType", form.marketType);
      formData.append("status", form.status);
      formData.append("visibility", form.visibility);
      formData.append("rentType", form.rentType || "");

      formData.append("priceAmount", form.priceAmount || "");
      formData.append("priceCurrency", form.priceCurrency || "");

      formData.append("country", form.country.trim());
      formData.append("city", form.city.trim());
      formData.append("province", form.province.trim());
      formData.append("district", form.district.trim());
      formData.append("sector", form.sector.trim());
      formData.append("cell", form.cell.trim());
      formData.append("village", form.village.trim());
      formData.append("addressLine1", form.addressLine1.trim());
      formData.append("addressLine2", form.addressLine2.trim());
      formData.append("postalCode", form.postalCode.trim());

      formData.append("bedrooms", !isLand ? form.bedrooms || "" : "");
      formData.append("bathrooms", !isLand ? form.bathrooms || "" : "");
      formData.append("plotSizeSqm", isLand ? form.plotSizeSqm || "" : "");

      const highlights = form.highlights
        ? form.highlights.split(",").map((item) => item.trim()).filter(Boolean)
        : [];
      formData.append("highlights", JSON.stringify(highlights));

      formData.append("imageTitle", form.imageTitle.trim());
      formData.append("imageAltText", form.imageAltText.trim());
      formData.append("imageCaption", form.imageCaption.trim());
      formData.append("imageCategory", form.imageCategory);
      formData.append("isCoverImage", String(form.isCoverImage));
      formData.append("imageIsPublic", String(form.imageIsPublic));

      formData.append("videoTitle", form.videoTitle.trim());
      formData.append("videoCaption", form.videoCaption.trim());
      formData.append("isPrimaryVideo", String(form.isPrimaryVideo));
      formData.append("videoIsPublic", String(form.videoIsPublic));

      formData.append("documentTitle", form.documentTitle.trim());
      formData.append("documentCaption", form.documentCaption.trim());
      formData.append("documentKind", form.documentKind);
      formData.append("isDownloadable", String(form.isDownloadable));
      formData.append("documentIsPublic", String(form.documentIsPublic));

      for (const image of imageFiles) {
        formData.append("images", image);
      }

      if (videoFile) {
        formData.append("video", videoFile);
      }

      if (documentFile) {
        formData.append("document", documentFile);
      }

      const res = await fetch("/api/admin/properties/create", {
        method: "POST",
        body: formData,
      });

      const result = await safeJson<ApiResponse<{ id: string }>>(res);

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to save property and media.");
      }

      setSuccess(result.message || "Property and media saved successfully.");

      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Add Property</h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2 text-sm font-semibold text-gray-700">
            Property Information
          </div>

          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Title"
            value={form.title}
            onChange={(e) => {
              const title = e.target.value;
              setField("title", title);
              if (!form.slug) setField("slug", slugify(title));
            }}
            required
          />

          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setField("slug", slugify(e.target.value))}
            required
          />

          <textarea
            className="rounded-lg border px-3 py-3 md:col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={4}
          />

          <select
            className="rounded-lg border px-3 py-3"
            value={form.kind}
            onChange={(e) => {
              const kind = e.target.value as FormState["kind"];
              setField("kind", kind);

              if (kind === "LAND") {
                setField("bedrooms", "");
                setField("bathrooms", "");
              } else {
                setField("plotSizeSqm", "");
              }
            }}
          >
            <option value="HOUSE">House</option>
            <option value="LAND">Land</option>
          </select>

          <select
            className="rounded-lg border px-3 py-3"
            value={form.purpose}
            onChange={(e) => setField("purpose", e.target.value as FormState["purpose"])}
          >
            <option value="SELL">Sell</option>
            <option value="BUY">Buy</option>
            <option value="RENT">Rent</option>
            <option value="LETTINGS">Lettings</option>
          </select>

          <select
            className="rounded-lg border px-3 py-3"
            value={form.marketType}
            onChange={(e) => setField("marketType", e.target.value as FormState["marketType"])}
          >
            <option value="ON_MARKET">On Market</option>
            <option value="ON_PLAN">On Plan</option>
            <option value="OFF_PLAN">Off Plan</option>
            <option value="OFF_MARKET">Off Market</option>
          </select>

          <select
            className="rounded-lg border px-3 py-3"
            value={form.status}
            onChange={(e) => setField("status", e.target.value as FormState["status"])}
          >
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SOLD">Sold</option>
            <option value="RENTED">Rented</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          <select
            className="rounded-lg border px-3 py-3"
            value={form.visibility}
            onChange={(e) => setField("visibility", e.target.value as FormState["visibility"])}
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
            <option value="HIDDEN">Hidden</option>
          </select>

          <select
            className="rounded-lg border px-3 py-3"
            value={form.rentType}
            onChange={(e) => setField("rentType", e.target.value as FormState["rentType"])}
          >
            <option value="">Rent Type</option>
            <option value="LONG_TERM">Long Term</option>
            <option value="SHORT_STAY">Short Stay</option>
          </select>

          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Price"
            type="number"
            step="0.01"
            value={form.priceAmount}
            onChange={(e) => setField("priceAmount", e.target.value)}
          />

          <select
            className="rounded-lg border px-3 py-3"
            value={form.priceCurrency}
            onChange={(e) => setField("priceCurrency", e.target.value as FormState["priceCurrency"])}
          >
            <option value="">Currency</option>
            <option value="RWF">RWF</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>

          {!isLand && (
            <>
              <input
                className="rounded-lg border px-3 py-3"
                placeholder="Bedrooms"
                type="number"
                min="0"
                value={form.bedrooms}
                onChange={(e) => setField("bedrooms", e.target.value)}
              />
              <input
                className="rounded-lg border px-3 py-3"
                placeholder="Bathrooms"
                type="number"
                min="0"
                value={form.bathrooms}
                onChange={(e) => setField("bathrooms", e.target.value)}
              />
            </>
          )}

          {isLand && (
            <input
              className="rounded-lg border px-3 py-3 md:col-span-2"
              placeholder="Plot size sqm"
              type="number"
              min="0.01"
              step="0.01"
              value={form.plotSizeSqm}
              onChange={(e) => setField("plotSizeSqm", e.target.value)}
              required
            />
          )}

          <input
            className="rounded-lg border px-3 py-3 md:col-span-2"
            placeholder="Highlights separated by commas"
            value={form.highlights}
            onChange={(e) => setField("highlights", e.target.value)}
          />

          <div className="md:col-span-2 mt-2 text-sm font-semibold text-gray-700">
            Location
          </div>

          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setField("country", e.target.value)}
            required
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="City"
            value={form.city}
            onChange={(e) => setField("city", e.target.value)}
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Province"
            value={form.province}
            onChange={(e) => setField("province", e.target.value)}
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="District"
            value={form.district}
            onChange={(e) => setField("district", e.target.value)}
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Sector"
            value={form.sector}
            onChange={(e) => setField("sector", e.target.value)}
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Cell"
            value={form.cell}
            onChange={(e) => setField("cell", e.target.value)}
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Village"
            value={form.village}
            onChange={(e) => setField("village", e.target.value)}
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Address line 1"
            value={form.addressLine1}
            onChange={(e) => setField("addressLine1", e.target.value)}
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Address line 2"
            value={form.addressLine2}
            onChange={(e) => setField("addressLine2", e.target.value)}
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Postal code"
            value={form.postalCode}
            onChange={(e) => setField("postalCode", e.target.value)}
          />

          <div className="md:col-span-2 mt-2 text-sm font-semibold text-gray-700">Images</div>

          <input
            className="rounded-lg border px-3 py-3 md:col-span-2"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
          />

          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Image title"
            value={form.imageTitle}
            onChange={(e) => setField("imageTitle", e.target.value)}
          />
          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Image alt text"
            value={form.imageAltText}
            onChange={(e) => setField("imageAltText", e.target.value)}
          />

          <textarea
            className="rounded-lg border px-3 py-3 md:col-span-2"
            placeholder="Image caption"
            rows={3}
            value={form.imageCaption}
            onChange={(e) => setField("imageCaption", e.target.value)}
          />

          <select
            className="rounded-lg border px-3 py-3"
            value={form.imageCategory}
            onChange={(e) => setField("imageCategory", e.target.value as FormState["imageCategory"])}
          >
            <option value="COVER">Cover</option>
            <option value="GALLERY">Gallery</option>
            <option value="INTERIOR">Interior</option>
            <option value="EXTERIOR">Exterior</option>
            <option value="BEDROOM">Bedroom</option>
            <option value="BATHROOM">Bathroom</option>
            <option value="KITCHEN">Kitchen</option>
            <option value="LIVING_ROOM">Living room</option>
            <option value="DINING">Dining</option>
            <option value="AMENITY">Amenity</option>
            <option value="MAP">Map</option>
            <option value="OTHER">Other</option>
          </select>

          <label className="flex items-center gap-2 rounded-lg border px-3 py-3">
            <input
              type="checkbox"
              checked={form.isCoverImage}
              onChange={(e) => setField("isCoverImage", e.target.checked)}
            />
            First image is cover
          </label>

          <label className="md:col-span-2 flex items-center gap-2 rounded-lg border px-3 py-3">
            <input
              type="checkbox"
              checked={form.imageIsPublic}
              onChange={(e) => setField("imageIsPublic", e.target.checked)}
            />
            Images are public
          </label>

          <div className="md:col-span-2 mt-2 text-sm font-semibold text-gray-700">Video</div>

          <input
            className="rounded-lg border px-3 py-3 md:col-span-2"
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
          />

          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Video title"
            value={form.videoTitle}
            onChange={(e) => setField("videoTitle", e.target.value)}
          />

          <label className="flex items-center gap-2 rounded-lg border px-3 py-3">
            <input
              type="checkbox"
              checked={form.isPrimaryVideo}
              onChange={(e) => setField("isPrimaryVideo", e.target.checked)}
            />
            Primary video
          </label>

          <textarea
            className="rounded-lg border px-3 py-3 md:col-span-2"
            placeholder="Video caption"
            rows={3}
            value={form.videoCaption}
            onChange={(e) => setField("videoCaption", e.target.value)}
          />

          <label className="md:col-span-2 flex items-center gap-2 rounded-lg border px-3 py-3">
            <input
              type="checkbox"
              checked={form.videoIsPublic}
              onChange={(e) => setField("videoIsPublic", e.target.checked)}
            />
            Video is public
          </label>

          <div className="md:col-span-2 mt-2 text-sm font-semibold text-gray-700">Document / PDF</div>

          <input
            className="rounded-lg border px-3 py-3 md:col-span-2"
            type="file"
            accept="application/pdf"
            onChange={(e) => setDocumentFile(e.target.files?.[0] ?? null)}
          />

          <input
            className="rounded-lg border px-3 py-3"
            placeholder="Document title"
            value={form.documentTitle}
            onChange={(e) => setField("documentTitle", e.target.value)}
          />

          <select
            className="rounded-lg border px-3 py-3"
            value={form.documentKind}
            onChange={(e) => setField("documentKind", e.target.value as FormState["documentKind"])}
          >
            <option value="BROCHURE">Brochure</option>
            <option value="FLOOR_PLAN">Floor plan</option>
            <option value="TITLE_DEED">Title deed</option>
            <option value="OTHER">Other</option>
          </select>

          <textarea
            className="rounded-lg border px-3 py-3 md:col-span-2"
            placeholder="Document caption"
            rows={3}
            value={form.documentCaption}
            onChange={(e) => setField("documentCaption", e.target.value)}
          />

          <label className="flex items-center gap-2 rounded-lg border px-3 py-3">
            <input
              type="checkbox"
              checked={form.isDownloadable}
              onChange={(e) => setField("isDownloadable", e.target.checked)}
            />
            Allow document download
          </label>

          <label className="flex items-center gap-2 rounded-lg border px-3 py-3">
            <input
              type="checkbox"
              checked={form.documentIsPublic}
              onChange={(e) => setField("documentIsPublic", e.target.checked)}
            />
            Document is public
          </label>

          {imageFiles.length > 0 ? (
            <p className="md:col-span-2 text-sm text-gray-600">
              {imageFiles.length} image(s) selected
            </p>
          ) : null}

          {videoFile ? (
            <p className="md:col-span-2 text-sm text-gray-600">
              Video selected: {videoFile.name}
            </p>
          ) : null}

          {documentFile ? (
            <p className="md:col-span-2 text-sm text-gray-600">
              Document selected: {documentFile.name}
            </p>
          ) : null}

          {error ? <p className="md:col-span-2 text-sm text-red-600">{error}</p> : null}
          {success ? <p className="md:col-span-2 text-sm text-green-600">{success}</p> : null}

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" onClick={handleClose} className="rounded-lg border px-4 py-2">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}