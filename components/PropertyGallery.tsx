import { useState } from "react";

type GalleryImage = {
  id: string;
  url: string | null;
  altText: string | null;
  caption: string | null;
  title: string | null;
  isCover: boolean;
  sortOrder: number;
};

type PropertyGalleryProps = {
  images: GalleryImage[];
  title: string;
};

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-3xl bg-gray-100 text-gray-500">
        No images available
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl bg-gray-100">
        <div className="relative h-[420px] w-full md:h-[520px]">
          {activeImage?.url ? (
            <img
              src={activeImage.url}
              alt={activeImage.altText || title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-500">
              No image available
            </div>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`overflow-hidden rounded-2xl border ${
                  isActive ? "border-black" : "border-gray-200"
                }`}
              >
                {image.url ? (
                  <img
                    src={image.url}
                    alt={image.altText || title}
                    className="h-24 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-24 items-center justify-center bg-gray-100 text-xs text-gray-500">
                    No image
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}