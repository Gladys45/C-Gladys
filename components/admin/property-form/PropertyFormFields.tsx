// "use client";

// import { Controller, useFormContext } from "react-hook-form";
// import type { PropertyFormValues } from "@/types/property-form";
// import ChipsInput from "./ChipsInput";
// import SectionCard from "./SectionCard";

// type Props = {
//   slugPreview: string;
// };

// export default function PropertyFormFields({ slugPreview }: Props) {
//   const { register, control, watch } = useFormContext<PropertyFormValues>();

//   const kind = watch("kind");
//   const purpose = watch("purpose");

//   const showMarketType = purpose === "SELL" || purpose === "BUY";
//   const showRentType = purpose === "RENT" || purpose === "LETTINGS";
//   const showPricePeriod = purpose === "RENT" || purpose === "LETTINGS";
//   const isHouse = kind === "HOUSE";
//   const isLand = kind === "LAND";

//   return (
//     <div className="space-y-6">
//       <SectionCard title="Basic Information" subtitle="Core property identity.">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//           <Field label="Title">
//             <Input {...register("title")} placeholder="4 Bedroom Villa in Nyarutarama" />
//           </Field>

//           <Field label="Slug">
//             <Input value={slugPreview} readOnly disabled />
//           </Field>

//           <Field label="Property Kind">
//             <Select {...register("kind")}>
//               <option value="HOUSE">HOUSE</option>
//               <option value="LAND">LAND</option>
//             </Select>
//           </Field>

//           <Field label="Purpose">
//             <Select {...register("purpose")}>
//               <option value="SELL">SELL</option>
//               <option value="BUY">BUY</option>
//               <option value="RENT">RENT</option>
//               <option value="LETTINGS">LETTINGS</option>
//             </Select>
//           </Field>

//           {showMarketType ? (
//             <Field label="Market Type">
//               <Select {...register("marketType")}>
//                 <option value="ON_MARKET">ON_MARKET</option>
//                 <option value="OFF_MARKET">OFF_MARKET</option>
//               </Select>
//             </Field>
//           ) : null}

//           {showRentType ? (
//             <Field label="Rent Type">
//               <Select {...register("rentType")}>
//                 <option value="LONG_TERM">LONG_TERM</option>
//                 <option value="SHORT_STAY">SHORT_STAY</option>
//               </Select>
//             </Field>
//           ) : null}

//           <Field label="Price Amount">
//             <Input {...register("priceAmount")} type="number" placeholder="350000000" />
//           </Field>

//           <Field label="Currency">
//             <Select {...register("priceCurrency")}>
//               <option value="RWF">RWF</option>
//               <option value="USD">USD</option>
//               <option value="EUR">EUR</option>
//               <option value="GBP">GBP</option>
//             </Select>
//           </Field>

//           {showPricePeriod ? (
//             <Field label="Price Period">
//               <Select {...register("pricePeriod")}>
//                 <option value="MONTH">MONTH</option>
//                 <option value="NIGHT">NIGHT</option>
//                 <option value="WEEK">WEEK</option>
//                 <option value="YEAR">YEAR</option>
//               </Select>
//             </Field>
//           ) : null}

//           <div className="flex items-end">
//             <label className="inline-flex min-h-[48px] items-center gap-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm text-neutral-700">
//               <input type="checkbox" {...register("priceOnApplication")} />
//               Price on application
//             </label>
//           </div>
//         </div>

//         <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
//           <Field label="Description">
//             <Textarea {...register("description")} rows={5} />
//           </Field>

//           <Controller
//             name="highlights"
//             control={control}
//             render={({ field }) => (
//               <ChipsInput
//                 label="Highlights"
//                 value={field.value ?? []}
//                 onChange={field.onChange}
//                 placeholder="Add highlight and press Enter"
//               />
//             )}
//           />
//         </div>
//       </SectionCard>

//       <SectionCard title="Location" subtitle="Location fields saved to the database.">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//           <Field label="Country">
//             <Input {...register("country")} />
//           </Field>
//           <Field label="City">
//             <Input {...register("city")} />
//           </Field>
//           <Field label="Province">
//             <Input {...register("province")} />
//           </Field>
//           <Field label="District">
//             <Input {...register("district")} />
//           </Field>
//           <Field label="Sector">
//             <Input {...register("sector")} />
//           </Field>
//           <Field label="Cell">
//             <Input {...register("cell")} />
//           </Field>
//           <Field label="Village">
//             <Input {...register("village")} />
//           </Field>
//           <Field label="Latitude">
//             <Input {...register("lat")} />
//           </Field>
//           <Field label="Longitude">
//             <Input {...register("lng")} />
//           </Field>
//         </div>
//       </SectionCard>

//       {isHouse ? (
//         <SectionCard title="House Details" subtitle="Shown only for HOUSE properties.">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//             <Field label="Bedrooms">
//               <Input {...register("bedrooms")} type="number" />
//             </Field>
//             <Field label="Bathrooms">
//               <Input {...register("bathrooms")} type="number" />
//             </Field>
//             <Field label="Size (sqm)">
//               <Input {...register("sizeSqm")} type="number" />
//             </Field>
//             <Field label="Furnished">
//               <Select {...register("furnished")}>
//                 <option value="">Select</option>
//                 <option value="FURNISHED">FURNISHED</option>
//                 <option value="UNFURNISHED">UNFURNISHED</option>
//                 <option value="PART_FURNISHED">PART_FURNISHED</option>
//               </Select>
//             </Field>
//           </div>

//           <div className="mt-4">
//             <Controller
//               name="amenities"
//               control={control}
//               render={({ field }) => (
//                 <ChipsInput
//                   label="Amenities"
//                   value={field.value ?? []}
//                   onChange={field.onChange}
//                   placeholder="Add amenity and press Enter"
//                 />
//               )}
//             />
//           </div>
//         </SectionCard>
//       ) : null}

//       {isLand ? (
//         <SectionCard title="Land Details" subtitle="Shown only for LAND properties.">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//             <Field label="Plot Size (sqm)">
//               <Input {...register("plotSizeSqm")} type="number" />
//             </Field>
//             <Field label="Zoning">
//               <Input {...register("zoning")} />
//             </Field>
//             <Field label="Title Type">
//               <Select {...register("titleType")}>
//                 <option value="">Select</option>
//                 <option value="FREEHOLD">FREEHOLD</option>
//                 <option value="LEASEHOLD">LEASEHOLD</option>
//                 <option value="CUSTOMARY">CUSTOMARY</option>
//               </Select>
//             </Field>
//             <Field label="Title Status">
//               <Select {...register("titleStatus")}>
//                 <option value="">Select</option>
//                 <option value="READY">READY</option>
//                 <option value="IN_PROCESS">IN_PROCESS</option>
//                 <option value="UNKNOWN">UNKNOWN</option>
//               </Select>
//             </Field>
//             <Field label="Access Road">
//               <Select {...register("accessRoad")}>
//                 <option value="">Select</option>
//                 <option value="TARMAC">TARMAC</option>
//                 <option value="MURRAM">MURRAM</option>
//                 <option value="PRIVATE">PRIVATE</option>
//                 <option value="NONE">NONE</option>
//               </Select>
//             </Field>
//           </div>

//           <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
//             <CheckBoxLabel label="Water" {...register("water")} />
//             <CheckBoxLabel label="Electricity" {...register("electricity")} />
//             <CheckBoxLabel label="Internet Fiber" {...register("internetFiber")} />
//             <CheckBoxLabel label="Sewage" {...register("sewage")} />
//             <CheckBoxLabel label="Survey Available" {...register("surveyAvailable")} />
//             <CheckBoxLabel label="Boundaries Marked" {...register("boundariesMarked")} />
//           </div>

//           <div className="mt-4">
//             <Controller
//               name="restrictions"
//               control={control}
//               render={({ field }) => (
//                 <ChipsInput
//                   label="Restrictions"
//                   value={field.value ?? []}
//                   onChange={field.onChange}
//                   placeholder="Add restriction and press Enter"
//                 />
//               )}
//             />
//           </div>
//         </SectionCard>
//       ) : null}
//     </div>
//   );
// }

// function Field({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <label className="text-sm font-semibold text-black">{label}</label>
//       {children}
//     </div>
//   );
// }

// function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
//   return (
//     <input
//       {...props}
//       className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-black"
//     />
//   );
// }

// function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
//   return (
//     <select
//       {...props}
//       className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-black"
//     />
//   );
// }

// function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
//   return (
//     <textarea
//       {...props}
//       className="w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm outline-none transition focus:border-black"
//     />
//   );
// }

// function CheckBoxLabel(
//   props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }
// ) {
//   const { label, ...rest } = props;

//   return (
//     <label className="inline-flex min-h-[48px] items-center gap-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm text-neutral-700">
//       <input type="checkbox" {...rest} />
//       {label}
//     </label>
//   );
// }

"use client";

import React, { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { PropertyFormValues } from "@/lib/validation/property-form";
import ChipsInput from "./ChipsInput";
import SectionCard from "./SectionCard";

type Props = {
  slugPreview: string;
};

export default function PropertyFormFields({ slugPreview }: Props) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<PropertyFormValues>();

  const kind = watch("kind");
  const purpose = watch("purpose");

  const showMarketType = purpose === "SELL" || purpose === "BUY";
  const showRentType = purpose === "RENT" || purpose === "LETTINGS";
  const showPricePeriod = purpose === "RENT" || purpose === "LETTINGS";
  const isHouse = kind === "HOUSE";
  const isLand = kind === "LAND";

  return (
    <div className="space-y-6">
      <SectionCard title="Basic Information" subtitle="Core property identity.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Title" error={errors.title?.message}>
            <Input {...register("title")} placeholder="4 Bedroom Villa in Nyarutarama" />
          </Field>

          <Field label="Slug">
            <Input value={slugPreview} readOnly disabled />
          </Field>

          <Field label="Property Kind" error={errors.kind?.message}>
            <Select {...register("kind")}>
              <option value="HOUSE">HOUSE</option>
              <option value="LAND">LAND</option>
            </Select>
          </Field>

          <Field label="Purpose" error={errors.purpose?.message}>
            <Select {...register("purpose")}>
              <option value="SELL">SELL</option>
              <option value="BUY">BUY</option>
              <option value="RENT">RENT</option>
              <option value="LETTINGS">LETTINGS</option>
            </Select>
          </Field>

          {showMarketType ? (
            <Field label="Market Type" error={errors.marketType?.message as string | undefined}>
              <Select {...register("marketType")}>
                <option value="ON_MARKET">ON_MARKET</option>
                <option value="OFF_MARKET">OFF_MARKET</option>
              </Select>
            </Field>
          ) : null}

          {showRentType ? (
            <Field label="Rent Type" error={errors.rentType?.message as string | undefined}>
              <Select {...register("rentType")}>
                <option value="LONG_TERM">LONG_TERM</option>
                <option value="SHORT_STAY">SHORT_STAY</option>
              </Select>
            </Field>
          ) : null}

          <Field label="Price Amount" error={errors.priceAmount?.message}>
            <Input {...register("priceAmount")} type="number" placeholder="350000000" />
          </Field>

          <Field label="Currency" error={errors.priceCurrency?.message}>
            <Select {...register("priceCurrency")}>
              <option value="RWF">RWF</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </Select>
          </Field>

          {showPricePeriod ? (
            <Field label="Price Period" error={errors.pricePeriod?.message as string | undefined}>
              <Select {...register("pricePeriod")}>
                <option value="">Select</option>
                <option value="MONTH">MONTH</option>
                <option value="NIGHT">NIGHT</option>
                <option value="WEEK">WEEK</option>
                <option value="YEAR">YEAR</option>
              </Select>
            </Field>
          ) : null}

          <div className="flex items-end">
            <label className="inline-flex min-h-[48px] items-center gap-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm text-neutral-700">
              <Checkbox {...register("priceOnApplication")} />
              Price on application
            </label>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <Field label="Description" error={errors.description?.message}>
            <Textarea {...register("description")} rows={5} />
          </Field>

          <Controller
            name="highlights"
            control={control}
            render={({ field }) => (
              <ChipsInput
                label="Highlights"
                value={field.value ?? []}
                onChange={field.onChange}
                placeholder="Add highlight and press Enter"
              />
            )}
          />
        </div>
      </SectionCard>

      <SectionCard title="Location" subtitle="Location fields saved to the database.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Country" error={errors.country?.message}>
            <Input {...register("country")} />
          </Field>
          <Field label="City">
            <Input {...register("city")} />
          </Field>
          <Field label="Province">
            <Input {...register("province")} />
          </Field>
          <Field label="District">
            <Input {...register("district")} />
          </Field>
          <Field label="Sector">
            <Input {...register("sector")} />
          </Field>
          <Field label="Cell">
            <Input {...register("cell")} />
          </Field>
          <Field label="Village">
            <Input {...register("village")} />
          </Field>
          <Field label="Latitude">
            <Input {...register("lat")} />
          </Field>
          <Field label="Longitude">
            <Input {...register("lng")} />
          </Field>
        </div>
      </SectionCard>

      {isHouse ? (
        <SectionCard title="House Details" subtitle="Shown only for HOUSE properties.">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field label="Bedrooms">
              <Input {...register("bedrooms")} type="number" />
            </Field>
            <Field label="Bathrooms">
              <Input {...register("bathrooms")} type="number" />
            </Field>
            <Field label="Size (sqm)">
              <Input {...register("sizeSqm")} type="number" />
            </Field>
            <Field label="Furnished">
              <Select {...register("furnished")}>
                <option value="">Select</option>
                <option value="FURNISHED">FURNISHED</option>
                <option value="UNFURNISHED">UNFURNISHED</option>
                <option value="PART_FURNISHED">PART_FURNISHED</option>
              </Select>
            </Field>
          </div>

          <div className="mt-4">
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <ChipsInput
                  label="Amenities"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  placeholder="Add amenity and press Enter"
                />
              )}
            />
          </div>
        </SectionCard>
      ) : null}

      {isLand ? (
        <SectionCard title="Land Details" subtitle="Shown only for LAND properties.">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field label="Plot Size (sqm)" error={errors.plotSizeSqm?.message}>
              <Input {...register("plotSizeSqm")} type="number" />
            </Field>
            <Field label="Zoning">
              <Input {...register("zoning")} />
            </Field>
            <Field label="Title Type">
              <Select {...register("titleType")}>
                <option value="">Select</option>
                <option value="FREEHOLD">FREEHOLD</option>
                <option value="LEASEHOLD">LEASEHOLD</option>
                <option value="CUSTOMARY">CUSTOMARY</option>
              </Select>
            </Field>
            <Field label="Title Status">
              <Select {...register("titleStatus")}>
                <option value="">Select</option>
                <option value="READY">READY</option>
                <option value="IN_PROCESS">IN_PROCESS</option>
                <option value="UNKNOWN">UNKNOWN</option>
              </Select>
            </Field>
            <Field label="Access Road">
              <Select {...register("accessRoad")}>
                <option value="">Select</option>
                <option value="TARMAC">TARMAC</option>
                <option value="MURRAM">MURRAM</option>
                <option value="PRIVATE">PRIVATE</option>
                <option value="NONE">NONE</option>
              </Select>
            </Field>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            <CheckBoxLabel label="Water" {...register("water")} />
            <CheckBoxLabel label="Electricity" {...register("electricity")} />
            <CheckBoxLabel label="Internet Fiber" {...register("internetFiber")} />
            <CheckBoxLabel label="Sewage" {...register("sewage")} />
            <CheckBoxLabel label="Survey Available" {...register("surveyAvailable")} />
            <CheckBoxLabel label="Boundaries Marked" {...register("boundariesMarked")} />
          </div>

          <div className="mt-4">
            <Controller
              name="restrictions"
              control={control}
              render={({ field }) => (
                <ChipsInput
                  label="Restrictions"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  placeholder="Add restriction and press Enter"
                />
              )}
            />
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-black">{label}</label>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-black"
      />
    );
  }
);

const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select(props, ref) {
    return (
      <select
        ref={ref}
        {...props}
        className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-black"
      />
    );
  }
);

const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea(props, ref) {
  return (
    <textarea
      ref={ref}
      {...props}
      className="w-full rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm outline-none transition focus:border-black"
    />
  );
});

const Checkbox = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Checkbox(props, ref) {
    return <input ref={ref} type="checkbox" {...props} className="h-4 w-4" />;
  }
);

function CheckBoxLabel(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }
) {
  const { label, ...rest } = props;

  return (
    <label className="inline-flex min-h-[48px] items-center gap-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm text-neutral-700">
      <Checkbox {...rest} />
      {label}
    </label>
  );
}