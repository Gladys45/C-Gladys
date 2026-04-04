// import { useState } from "react";
// import { HiOutlineXMark } from "react-icons/hi2";

// type AddPropertyModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function AddPropertyModal({
//   isOpen,
//   onClose,
// }: AddPropertyModalProps) {
//   const [formData, setFormData] = useState({
//     propertyName: "",
//     propertyType: "",
//     location: "",
//     price: "",
//     status: "Draft",
//     description: "",
//   });

//   if (!isOpen) return null;

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Sample property form:", formData);

//     onClose();
//     setFormData({
//       propertyName: "",
//       propertyType: "",
//       location: "",
//       price: "",
//       status: "Draft",
//       description: "",
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
//       <div className="w-full max-w-2xl rounded-[28px] border border-neutral-200 bg-white shadow-2xl">
//         <div className="flex items-center justify-between border-b border-neutral-100 p-[20px]">
//           <div>
//             <h3 className="text-2xl font-bold text-black">Add Property</h3>
//             <p className="mt-1 text-sm text-neutral-500">
//               Sample form for dashboard UI preview.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 text-neutral-600 transition hover:border-black hover:text-black"
//           >
//             <HiOutlineXMark className="text-2xl" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-[20px]">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <Field>
//               <Label>Property Name</Label>
//               <Input
//                 name="propertyName"
//                 value={formData.propertyName}
//                 onChange={handleChange}
//                 placeholder="Enter property name"
//               />
//             </Field>

//             <Field>
//               <Label>Property Type</Label>
//               <Select
//                 name="propertyType"
//                 value={formData.propertyType}
//                 onChange={handleChange}
//               >
//                 <option value="">Select type</option>
//                 <option value="Apartment">Apartment</option>
//                 <option value="Villa">Villa</option>
//                 <option value="Commercial">Commercial</option>
//                 <option value="Penthouse">Penthouse</option>
//               </Select>
//             </Field>

//             <Field>
//               <Label>Location</Label>
//               <Input
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="Enter location"
//               />
//             </Field>

//             <Field>
//               <Label>Price</Label>
//               <Input
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="Enter price"
//               />
//             </Field>

//             <Field>
//               <Label>Status</Label>
//               <Select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <option value="Draft">Draft</option>
//                 <option value="Review">Review</option>
//                 <option value="Published">Published</option>
//               </Select>
//             </Field>
//           </div>

//           <div className="mt-4">
//             <Field>
//               <Label>Description</Label>
//               <Textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Write a short property description"
//                 rows={5}
//               />
//             </Field>
//           </div>

//           <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="inline-flex h-12 items-center justify-center rounded-2xl border border-neutral-200 px-5 text-sm font-semibold text-black transition hover:border-black"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="inline-flex h-12 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:opacity-90"
//             >
//               Save Property
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function Field({ children }: { children: React.ReactNode }) {
//   return <div className="flex flex-col gap-2">{children}</div>;
// }

// function Label({ children }: { children: React.ReactNode }) {
//   return <label className="text-sm font-semibold text-black">{children}</label>;
// }

// function Input(
//   props: React.InputHTMLAttributes<HTMLInputElement>
// ) {
//   return (
//     <input
//       {...props}
//       className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-black"
//     />
//   );
// }

// function Select(
//   props: React.SelectHTMLAttributes<HTMLSelectElement>
// ) {
//   return (
//     <select
//       {...props}
//       className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-black"
//     />
//   );
// }

// function Textarea(
//   props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
// ) {
//   return (
//     <textarea
//       {...props}
//       className="w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm outline-none transition focus:border-black"
//     />
//   );
// }

import { useMemo, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineXMark } from "react-icons/hi2";

type AddPropertyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type MediaFormItem = {
  id: string;
  mediaKind: "IMAGE" | "VIDEO";
  sourceType: "FILE" | "EXTERNAL_LINK";
  url: string;
  alt: string;
  title: string;
  sortOrder: number;
  isCover: boolean;
  fileName: string;
  mimeType: string;
  fileSizeBytes: string;
  thumbnailUrl: string;
  durationSec: string;
};

type FormState = {
  title: string;
  slug: string;
  kind: "HOUSE" | "LAND";
  purpose: "SELL" | "BUY" | "RENT" | "LETTINGS";
  marketType: "ON_MARKET" | "OFF_MARKET" | "";
  rentType: "LONG_TERM" | "SHORT_STAY" | "";
  priceAmount: string;
  priceCurrency: "RWF" | "USD" | "EUR" | "GBP";
  pricePeriod: "MONTH" | "NIGHT" | "WEEK" | "YEAR" | "";
  priceLabel: string;
  priceOnApplication: boolean;
  description: string;
  highlightsText: string;

  country: string;
  city: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  lat: string;
  lng: string;

  bedrooms: string;
  bathrooms: string;
  sizeSqm: string;
  furnished: "FURNISHED" | "UNFURNISHED" | "PART_FURNISHED" | "";
  amenitiesText: string;

  plotSizeSqm: string;
  zoning: string;
  titleType: "FREEHOLD" | "LEASEHOLD" | "CUSTOMARY" | "";
  titleStatus: "READY" | "IN_PROCESS" | "UNKNOWN" | "";
  accessRoad: "TARMAC" | "MURRAM" | "PRIVATE" | "NONE" | "";
  water: boolean;
  electricity: boolean;
  internetFiber: boolean;
  sewage: boolean;
  surveyAvailable: boolean;
  boundariesMarked: boolean;
  restrictionsText: string;

  media: MediaFormItem[];
};

const initialFormState: FormState = {
  title: "",
  slug: "",
  kind: "HOUSE",
  purpose: "SELL",
  marketType: "ON_MARKET",
  rentType: "",
  priceAmount: "",
  priceCurrency: "RWF",
  pricePeriod: "",
  priceLabel: "",
  priceOnApplication: false,
  description: "",
  highlightsText: "",

  country: "Rwanda",
  city: "Kigali",
  province: "",
  district: "",
  sector: "",
  cell: "",
  village: "",
  lat: "",
  lng: "",

  bedrooms: "",
  bathrooms: "",
  sizeSqm: "",
  furnished: "",
  amenitiesText: "",

  plotSizeSqm: "",
  zoning: "",
  titleType: "",
  titleStatus: "",
  accessRoad: "",
  water: false,
  electricity: false,
  internetFiber: false,
  sewage: false,
  surveyAvailable: false,
  boundariesMarked: false,
  restrictionsText: "",

  media: [
    {
      id: cryptoSafeId(),
      mediaKind: "IMAGE",
      sourceType: "FILE",
      url: "",
      alt: "",
      title: "",
      sortOrder: 0,
      isCover: true,
      fileName: "",
      mimeType: "",
      fileSizeBytes: "",
      thumbnailUrl: "",
      durationSec: "",
    },
  ],
};

export default function AddPropertyModal({
  isOpen,
  onClose,
}: AddPropertyModalProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const showMarketType = formData.purpose === "SELL" || formData.purpose === "BUY";
  const showRentType = formData.purpose === "RENT";
  const isHouse = formData.kind === "HOUSE";
  const isLand = formData.kind === "LAND";

  const computedSlug = useMemo(() => {
    if (!formData.title.trim()) return "";
    return slugify(formData.title);
  }, [formData.title]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isSubmitting) return;
    setErrorMessage("");
    setSuccessMessage("");
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      if (name === "title" && !prev.slug.trim()) {
        next.slug = slugify(value);
      }

      if (name === "purpose") {
        if (value === "SELL" || value === "BUY") {
          next.marketType = prev.marketType || "ON_MARKET";
          next.rentType = "";
          next.pricePeriod = "";
        } else if (value === "RENT") {
          next.rentType = prev.rentType || "LONG_TERM";
          next.marketType = "";
          next.pricePeriod = prev.pricePeriod || "MONTH";
        } else {
          next.marketType = "";
          next.rentType = "";
          next.pricePeriod = "";
        }
      }

      if (name === "kind") {
        if (value === "HOUSE") {
          next.plotSizeSqm = "";
          next.zoning = "";
          next.titleType = "";
          next.titleStatus = "";
          next.accessRoad = "";
          next.restrictionsText = "";
        }

        if (value === "LAND") {
          next.bedrooms = "";
          next.bathrooms = "";
          next.sizeSqm = "";
          next.furnished = "";
          next.amenitiesText = "";
        }
      }

      return next;
    });
  };

  const handleMediaChange = (
    id: string,
    field: keyof MediaFormItem,
    value: string | boolean | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addMediaRow = () => {
    setFormData((prev) => ({
      ...prev,
      media: [
        ...prev.media,
        {
          id: cryptoSafeId(),
          mediaKind: "IMAGE",
          sourceType: "FILE",
          url: "",
          alt: "",
          title: "",
          sortOrder: prev.media.length,
          isCover: false,
          fileName: "",
          mimeType: "",
          fileSizeBytes: "",
          thumbnailUrl: "",
          durationSec: "",
        },
      ],
    }));
  };

  const removeMediaRow = (id: string) => {
    setFormData((prev) => {
      const filtered = prev.media.filter((item) => item.id !== id);
      const reOrdered = filtered.map((item, index) => ({
        ...item,
        sortOrder: index,
      }));

      return {
        ...prev,
        media: reOrdered.length > 0 ? reOrdered : [],
      };
    });
  };

  const validateForm = (): string | null => {
    if (!formData.title.trim()) return "Property title is required.";
    if (!formData.slug.trim()) return "Property slug is required.";
    if (!formData.kind) return "Property kind is required.";
    if (!formData.purpose) return "Property purpose is required.";

    if (showMarketType && !formData.marketType) {
      return "Market type is required for SELL or BUY.";
    }

    if (showRentType && !formData.rentType) {
      return "Rent type is required for RENT.";
    }

    if (isHouse && !formData.title.trim()) return "House title is required.";
    if (isLand && !formData.plotSizeSqm.trim()) return "Plot size is required for LAND.";

    for (const item of formData.media) {
      if (!item.url.trim()) continue;

      if (item.mediaKind === "IMAGE" && item.sourceType !== "FILE") {
        return "Images must use FILE source type.";
      }

      if (item.mediaKind === "VIDEO") {
        if (item.sourceType !== "FILE" && item.sourceType !== "EXTERNAL_LINK") {
          return "Video source type must be FILE or EXTERNAL_LINK.";
        }
      }
    }

    return null;
  };

  const resetForm = () => {
    setFormData({
      ...initialFormState,
      media: [
        {
          ...initialFormState.media[0],
          id: cryptoSafeId(),
        },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const payload = buildPayload(formData);

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/admin/properties/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result?.error || "Failed to save property.");
        return;
      }

      setSuccessMessage("Property saved successfully.");
      resetForm();

      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 800);
    } catch (error) {
      console.error("Save property error:", error);
      setErrorMessage("Something went wrong while saving property.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-100 p-[20px]">
          <div>
            <h3 className="text-2xl font-bold text-black">Add Property</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Create a property record that matches your database model.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 text-neutral-600 transition hover:border-black hover:text-black"
          >
            <HiOutlineXMark className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(95vh-81px)] overflow-y-auto p-[20px]">
          {errorMessage ? (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {successMessage ? (
            <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </div>
          ) : null}

          <SectionTitle
            title="Basic Information"
            subtitle="Main property identity and category."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field>
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="4 Bedroom Villa in Nyarutarama"
              />
            </Field>

            <Field>
              <Label>Slug</Label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder={computedSlug || "auto-generated-slug"}
              />
            </Field>

            <Field>
              <Label>Property Kind</Label>
              <Select name="kind" value={formData.kind} onChange={handleChange}>
                <option value="HOUSE">HOUSE</option>
                <option value="LAND">LAND</option>
              </Select>
            </Field>

            <Field>
              <Label>Purpose</Label>
              <Select name="purpose" value={formData.purpose} onChange={handleChange}>
                <option value="SELL">SELL</option>
                <option value="BUY">BUY</option>
                <option value="RENT">RENT</option>
                <option value="LETTINGS">LETTINGS</option>
              </Select>
            </Field>

            {showMarketType && (
              <Field>
                <Label>Market Type</Label>
                <Select
                  name="marketType"
                  value={formData.marketType}
                  onChange={handleChange}
                >
                  <option value="ON_MARKET">ON_MARKET</option>
                  <option value="OFF_MARKET">OFF_MARKET</option>
                </Select>
              </Field>
            )}

            {showRentType && (
              <Field>
                <Label>Rent Type</Label>
                <Select
                  name="rentType"
                  value={formData.rentType}
                  onChange={handleChange}
                >
                  <option value="LONG_TERM">LONG_TERM</option>
                  <option value="SHORT_STAY">SHORT_STAY</option>
                </Select>
              </Field>
            )}

            <Field>
              <Label>Price Amount</Label>
              <Input
                name="priceAmount"
                type="number"
                value={formData.priceAmount}
                onChange={handleChange}
                placeholder="350000000"
              />
            </Field>

            <Field>
              <Label>Currency</Label>
              <Select
                name="priceCurrency"
                value={formData.priceCurrency}
                onChange={handleChange}
              >
                <option value="RWF">RWF</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </Select>
            </Field>

            <Field>
              <Label>Price Period</Label>
              <Select
                name="pricePeriod"
                value={formData.pricePeriod}
                onChange={handleChange}
              >
                <option value="">None</option>
                <option value="MONTH">MONTH</option>
                <option value="NIGHT">NIGHT</option>
                <option value="WEEK">WEEK</option>
                <option value="YEAR">YEAR</option>
              </Select>
            </Field>

            <Field>
              <Label>Price Label</Label>
              <Input
                name="priceLabel"
                value={formData.priceLabel}
                onChange={handleChange}
                placeholder="RWF 350,000,000"
              />
            </Field>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Write full property description"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4">
              <Field>
                <Label>Highlights</Label>
                <Textarea
                  name="highlightsText"
                  value={formData.highlightsText}
                  onChange={handleChange}
                  rows={5}
                  placeholder="One per line, e.g. Prime location"
                />
              </Field>

              <CheckRow>
                <Checkbox
                  name="priceOnApplication"
                  checked={formData.priceOnApplication}
                  onChange={handleChange}
                />
                <span>Price on application</span>
              </CheckRow>
            </div>
          </div>

          <SectionTitle
            title="Location"
            subtitle="Geographic and address details."
            className="mt-8"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field>
              <Label>Country</Label>
              <Input name="country" value={formData.country} onChange={handleChange} />
            </Field>
            <Field>
              <Label>City</Label>
              <Input name="city" value={formData.city} onChange={handleChange} />
            </Field>
            <Field>
              <Label>Province</Label>
              <Input name="province" value={formData.province} onChange={handleChange} />
            </Field>
            <Field>
              <Label>District</Label>
              <Input name="district" value={formData.district} onChange={handleChange} />
            </Field>
            <Field>
              <Label>Sector</Label>
              <Input name="sector" value={formData.sector} onChange={handleChange} />
            </Field>
            <Field>
              <Label>Cell</Label>
              <Input name="cell" value={formData.cell} onChange={handleChange} />
            </Field>
            <Field>
              <Label>Village</Label>
              <Input name="village" value={formData.village} onChange={handleChange} />
            </Field>
            <Field>
              <Label>Latitude</Label>
              <Input name="lat" value={formData.lat} onChange={handleChange} />
            </Field>
            <Field>
              <Label>Longitude</Label>
              <Input name="lng" value={formData.lng} onChange={handleChange} />
            </Field>
          </div>

          {isHouse && (
            <>
              <SectionTitle
                title="House Details"
                subtitle="Used only when property kind is HOUSE."
                className="mt-8"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field>
                  <Label>Bedrooms</Label>
                  <Input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} />
                </Field>
                <Field>
                  <Label>Bathrooms</Label>
                  <Input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} />
                </Field>
                <Field>
                  <Label>Size (sqm)</Label>
                  <Input name="sizeSqm" type="number" value={formData.sizeSqm} onChange={handleChange} />
                </Field>
                <Field>
                  <Label>Furnished</Label>
                  <Select name="furnished" value={formData.furnished} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="FURNISHED">FURNISHED</option>
                    <option value="UNFURNISHED">UNFURNISHED</option>
                    <option value="PART_FURNISHED">PART_FURNISHED</option>
                  </Select>
                </Field>
              </div>

              <div className="mt-4">
                <Field>
                  <Label>Amenities</Label>
                  <Textarea
                    name="amenitiesText"
                    value={formData.amenitiesText}
                    onChange={handleChange}
                    rows={4}
                    placeholder="One per line, e.g. Garden"
                  />
                </Field>
              </div>
            </>
          )}

          {isLand && (
            <>
              <SectionTitle
                title="Plot Details"
                subtitle="Used only when property kind is LAND."
                className="mt-8"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field>
                  <Label>Plot Size (sqm)</Label>
                  <Input
                    name="plotSizeSqm"
                    type="number"
                    value={formData.plotSizeSqm}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  <Label>Zoning</Label>
                  <Input name="zoning" value={formData.zoning} onChange={handleChange} />
                </Field>

                <Field>
                  <Label>Title Type</Label>
                  <Select name="titleType" value={formData.titleType} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="FREEHOLD">FREEHOLD</option>
                    <option value="LEASEHOLD">LEASEHOLD</option>
                    <option value="CUSTOMARY">CUSTOMARY</option>
                  </Select>
                </Field>

                <Field>
                  <Label>Title Status</Label>
                  <Select name="titleStatus" value={formData.titleStatus} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="READY">READY</option>
                    <option value="IN_PROCESS">IN_PROCESS</option>
                    <option value="UNKNOWN">UNKNOWN</option>
                  </Select>
                </Field>

                <Field>
                  <Label>Access Road</Label>
                  <Select name="accessRoad" value={formData.accessRoad} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="TARMAC">TARMAC</option>
                    <option value="MURRAM">MURRAM</option>
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="NONE">NONE</option>
                  </Select>
                </Field>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                <CheckRow>
                  <Checkbox name="water" checked={formData.water} onChange={handleChange} />
                  <span>Water</span>
                </CheckRow>

                <CheckRow>
                  <Checkbox
                    name="electricity"
                    checked={formData.electricity}
                    onChange={handleChange}
                  />
                  <span>Electricity</span>
                </CheckRow>

                <CheckRow>
                  <Checkbox
                    name="internetFiber"
                    checked={formData.internetFiber}
                    onChange={handleChange}
                  />
                  <span>Internet Fiber</span>
                </CheckRow>

                <CheckRow>
                  <Checkbox name="sewage" checked={formData.sewage} onChange={handleChange} />
                  <span>Sewage</span>
                </CheckRow>

                <CheckRow>
                  <Checkbox
                    name="surveyAvailable"
                    checked={formData.surveyAvailable}
                    onChange={handleChange}
                  />
                  <span>Survey Available</span>
                </CheckRow>

                <CheckRow>
                  <Checkbox
                    name="boundariesMarked"
                    checked={formData.boundariesMarked}
                    onChange={handleChange}
                  />
                  <span>Boundaries Marked</span>
                </CheckRow>
              </div>

              <div className="mt-4">
                <Field>
                  <Label>Restrictions</Label>
                  <Textarea
                    name="restrictionsText"
                    value={formData.restrictionsText}
                    onChange={handleChange}
                    rows={4}
                    placeholder="One per line"
                  />
                </Field>
              </div>
            </>
          )}

          <SectionTitle
            title="Media"
            subtitle="Add image files, video files, or external video links."
            className="mt-8"
          />

          <div className="space-y-4">
            {formData.media.map((item, index) => {
              const isVideo = item.mediaKind === "VIDEO";

              return (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-neutral-200 bg-[#FAFAFA] p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-semibold text-black">Media #{index + 1}</h4>

                    <button
                      type="button"
                      onClick={() => removeMediaRow(item.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <HiOutlineTrash className="text-base" />
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field>
                      <Label>Media Kind</Label>
                      <Select
                        value={item.mediaKind}
                        onChange={(e) =>
                          handleMediaChange(item.id, "mediaKind", e.target.value as MediaFormItem["mediaKind"])
                        }
                      >
                        <option value="IMAGE">IMAGE</option>
                        <option value="VIDEO">VIDEO</option>
                      </Select>
                    </Field>

                    <Field>
                      <Label>Source Type</Label>
                      <Select
                        value={item.sourceType}
                        onChange={(e) =>
                          handleMediaChange(item.id, "sourceType", e.target.value as MediaFormItem["sourceType"])
                        }
                      >
                        {!isVideo ? (
                          <option value="FILE">FILE</option>
                        ) : (
                          <>
                            <option value="FILE">FILE</option>
                            <option value="EXTERNAL_LINK">EXTERNAL_LINK</option>
                          </>
                        )}
                      </Select>
                    </Field>

                    <Field>
                      <Label>URL / File Path / Link</Label>
                      <Input
                        value={item.url}
                        onChange={(e) => handleMediaChange(item.id, "url", e.target.value)}
                        placeholder={
                          item.sourceType === "EXTERNAL_LINK"
                            ? "https://youtube.com/..."
                            : "/uploads/property/file.webp"
                        }
                      />
                    </Field>

                    <Field>
                      <Label>Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => handleMediaChange(item.id, "title", e.target.value)}
                        placeholder="Optional title"
                      />
                    </Field>

                    <Field>
                      <Label>Alt Text</Label>
                      <Input
                        value={item.alt}
                        onChange={(e) => handleMediaChange(item.id, "alt", e.target.value)}
                        placeholder="Alt text"
                      />
                    </Field>

                    <Field>
                      <Label>File Name</Label>
                      <Input
                        value={item.fileName}
                        onChange={(e) => handleMediaChange(item.id, "fileName", e.target.value)}
                        placeholder="villa-cover.webp"
                      />
                    </Field>

                    <Field>
                      <Label>MIME Type</Label>
                      <Input
                        value={item.mimeType}
                        onChange={(e) => handleMediaChange(item.id, "mimeType", e.target.value)}
                        placeholder="image/webp or video/mp4"
                      />
                    </Field>

                    <Field>
                      <Label>File Size (bytes)</Label>
                      <Input
                        value={item.fileSizeBytes}
                        onChange={(e) => handleMediaChange(item.id, "fileSizeBytes", e.target.value)}
                        placeholder="120000"
                      />
                    </Field>

                    {isVideo && (
                      <>
                        <Field>
                          <Label>Thumbnail URL</Label>
                          <Input
                            value={item.thumbnailUrl}
                            onChange={(e) =>
                              handleMediaChange(item.id, "thumbnailUrl", e.target.value)
                            }
                            placeholder="Thumbnail URL"
                          />
                        </Field>

                        <Field>
                          <Label>Duration (seconds)</Label>
                          <Input
                            value={item.durationSec}
                            onChange={(e) =>
                              handleMediaChange(item.id, "durationSec", e.target.value)
                            }
                            placeholder="120"
                          />
                        </Field>
                      </>
                    )}

                    <CheckRow className="md:col-span-2 xl:col-span-1">
                      <Checkbox
                        checked={item.isCover}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData((prev) => ({
                            ...prev,
                            media: prev.media.map((mediaItem) => ({
                              ...mediaItem,
                              isCover: mediaItem.id === item.id ? checked : checked ? false : mediaItem.isCover,
                            })),
                          }));
                        }}
                      />
                      <span>Is cover</span>
                    </CheckRow>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={addMediaRow}
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:border-black"
            >
              <HiOutlinePlus className="text-lg" />
              Add Media
            </button>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-neutral-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-neutral-200 px-5 text-sm font-semibold text-black transition hover:border-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function buildPayload(formData: FormState) {
  const cleanLines = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const media = formData.media
    .filter((item) => item.url.trim())
    .map((item, index) => ({
      mediaKind: item.mediaKind,
      sourceType:
        item.mediaKind === "IMAGE" ? "FILE" : item.sourceType,
      url: item.url.trim(),
      alt: item.alt.trim() || null,
      title: item.title.trim() || null,
      sortOrder: index,
      isCover: Boolean(item.isCover),
      fileName: item.fileName.trim() || null,
      mimeType: item.mimeType.trim() || null,
      fileSizeBytes: item.fileSizeBytes.trim()
        ? Number(item.fileSizeBytes)
        : null,
      thumbnailUrl: item.thumbnailUrl.trim() || null,
      durationSec: item.durationSec.trim() ? Number(item.durationSec) : null,
    }));

  return {
    slug: formData.slug.trim() || slugify(formData.title),
    title: formData.title.trim(),
    kind: formData.kind,
    purpose: formData.purpose,
    marketType:
      formData.purpose === "SELL" || formData.purpose === "BUY"
        ? formData.marketType || null
        : null,
    rentType: formData.purpose === "RENT" ? formData.rentType || null : null,

    priceAmount: formData.priceAmount.trim() ? Number(formData.priceAmount) : null,
    priceCurrency: formData.priceCurrency || null,
    pricePeriod: formData.pricePeriod || null,
    priceLabel: formData.priceLabel.trim() || null,
    priceOnApplication: formData.priceOnApplication,

    description: formData.description.trim() || null,
    highlights: cleanLines(formData.highlightsText),

    location: {
      country: formData.country.trim(),
      city: formData.city.trim() || null,
      province: formData.province.trim() || null,
      district: formData.district.trim() || null,
      sector: formData.sector.trim() || null,
      cell: formData.cell.trim() || null,
      village: formData.village.trim() || null,
      lat: formData.lat.trim() ? Number(formData.lat) : null,
      lng: formData.lng.trim() ? Number(formData.lng) : null,
    },

    media,

    house:
      formData.kind === "HOUSE"
        ? {
            bedrooms: formData.bedrooms.trim() ? Number(formData.bedrooms) : null,
            bathrooms: formData.bathrooms.trim() ? Number(formData.bathrooms) : null,
            sizeSqm: formData.sizeSqm.trim() ? Number(formData.sizeSqm) : null,
            furnished: formData.furnished || null,
            amenities: cleanLines(formData.amenitiesText),
          }
        : null,

    plot:
      formData.kind === "LAND"
        ? {
            plotSizeSqm: Number(formData.plotSizeSqm || 0),
            zoning: formData.zoning.trim() || null,
            titleType: formData.titleType || null,
            titleStatus: formData.titleStatus || null,
            accessRoad: formData.accessRoad || null,
            water: formData.water,
            electricity: formData.electricity,
            internetFiber: formData.internetFiber,
            sewage: formData.sewage,
            surveyAvailable: formData.surveyAvailable,
            boundariesMarked: formData.boundariesMarked,
            restrictions: cleanLines(formData.restrictionsText),
          }
        : null,
  };
}

function cryptoSafeId() {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis && "randomUUID" in globalThis.crypto) {
    return globalThis.crypto.randomUUID();
  }

  return `media-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function SectionTitle({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h4 className="text-lg font-bold text-black">{title}</h4>
      <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-semibold text-black">{children}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;

  return (
    <input
      {...rest}
      className={`h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-black ${className}`}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = "", ...rest } = props;

  return (
    <select
      {...rest}
      className={`h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-black ${className}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;

  return (
    <textarea
      {...rest}
      className={`w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm outline-none transition focus:border-black ${className}`}
    />
  );
}

function Checkbox(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input {...props} type="checkbox" className="h-4 w-4 rounded border-neutral-300" />;
}

function CheckRow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`inline-flex min-h-[48px] items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 ${className}`}
    >
      {children}
    </label>
  );
}