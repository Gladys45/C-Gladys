// import { supabaseBrowser } from "@/lib/supabase-browser";

// type UploadResult = {
//   url: string;
//   fileName: string;
//   mimeType: string;
//   fileSizeBytes: number;
// };

// function cleanFileName(name: string) {
//   return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
// }

// async function uploadOneFile(
//   bucket: string,
//   path: string,
//   file: File
// ): Promise<UploadResult> {
//   const { error } = await supabaseBrowser.storage
//     .from(bucket)
//     .upload(path, file, { upsert: false });

//   if (error) {
//     throw new Error(error.message);
//   }

//   const { data } = supabaseBrowser.storage.from(bucket).getPublicUrl(path);

//   return {
//     url: data.publicUrl,
//     fileName: file.name,
//     mimeType: file.type,
//     fileSizeBytes: file.size,
//   };
// }

// export async function uploadPropertyFiles(params: {
//   bucket: string;
//   slug: string;
//   galleryFiles: File[];
//   videoFiles: File[];
// }) {
//   const { bucket, slug, galleryFiles, videoFiles } = params;

//   const galleryMedia = await Promise.all(
//     galleryFiles.map(async (file, index) => {
//       const path = `properties/${slug}/gallery/${Date.now()}-${index}-${cleanFileName(file.name)}`;
//       const uploaded = await uploadOneFile(bucket, path, file);

//       return {
//         ...uploaded,
//         alt: null,
//         isCover: index === 0,
//         sortOrder: index,
//       };
//     })
//   );

//   const videoMedia = await Promise.all(
//     videoFiles.map(async (file, index) => {
//       const path = `properties/${slug}/videos/${Date.now()}-${index}-${cleanFileName(file.name)}`;
//       const uploaded = await uploadOneFile(bucket, path, file);

//       return {
//         ...uploaded,
//         title: file.name,
//         durationSec: null,
//         sortOrder: galleryMedia.length + index,
//       };
//     })
//   );

//   return { galleryMedia, videoMedia };
// }

import { supabaseBrowser } from "@/lib/supabase-browser";

type UploadResult = {
  url: string;
  fileName: string;
  mimeType: string;
  fileSizeBytes: number;
};

function cleanFileName(name: string) {
  return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
}

async function uploadOneFile(
  bucket: string,
  path: string,
  file: File
): Promise<UploadResult> {
  const { error } = await supabaseBrowser.storage
    .from(bucket)
    .upload(path, file, { upsert: false });

  if (error) {
    throw new Error(`Storage upload failed for ${file.name}: ${error.message}`);
  }

  const { data } = supabaseBrowser.storage.from(bucket).getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error(`Could not get public URL for ${file.name}.`);
  }

  return {
    url: data.publicUrl,
    fileName: file.name,
    mimeType: file.type,
    fileSizeBytes: file.size,
  };
}

export async function uploadPropertyFiles(params: {
  bucket: string;
  slug: string;
  galleryFiles: File[];
  videoFiles: File[];
}) {
  const { bucket, slug, galleryFiles, videoFiles } = params;

  const galleryMedia = await Promise.all(
    galleryFiles.map(async (file, index) => {
      const path = `properties/${slug}/gallery/${Date.now()}-${index}-${cleanFileName(file.name)}`;
      const uploaded = await uploadOneFile(bucket, path, file);

      return {
        ...uploaded,
        alt: null,
        isCover: index === 0,
        sortOrder: index,
      };
    })
  );

  const videoMedia = await Promise.all(
    videoFiles.map(async (file, index) => {
      const path = `properties/${slug}/videos/${Date.now()}-${index}-${cleanFileName(file.name)}`;
      const uploaded = await uploadOneFile(bucket, path, file);

      return {
        ...uploaded,
        title: file.name,
        durationSec: null,
        sortOrder: galleryMedia.length + index,
      };
    })
  );

  return { galleryMedia, videoMedia };
}