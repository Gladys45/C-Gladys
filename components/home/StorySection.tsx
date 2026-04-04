"use client";

type StorySectionProps = {
  id?: string;
  title: string;
  paragraphs: string[];
  backgroundImageSrc: string;
  nextAnchorHref?: string; // e.g. "#our_story_two"
};

export default function StorySection({
  id = "our_story",
  title,
  paragraphs,
  backgroundImageSrc,
  nextAnchorHref = "#our_story_two",
}: StorySectionProps) {
  return (
    <section id={id} className="relative flex items-center justify-center z-50">
      <picture className="absolute top-0 left-0 object-cover z-30 h-full w-full">
        <img src={backgroundImageSrc} className="object-cover z-30 h-full w-full" alt="" />
      </picture>

      <div className="flex flex-col items-center z-50 max-w-4xl pt-24 pb-24 sm:pb-30 sm:px-0 px-6">
        <h1 className="text-primary text-4xl font-bold text-center">{title}</h1>

        {paragraphs.map((p, idx) => (
          <p key={idx} className="text-center text-white text-[18px] mt-6">
            {p}
          </p>
        ))}

        {nextAnchorHref && (
          <a href={nextAnchorHref} className="mt-8 animate-bounce cursor-pointer" aria-label="Scroll down">
            <svg className="next-arrow text-primary" width="40px" height="68px" viewBox="0 0 40 50">
              <path stroke="currentColor" strokeWidth={2} fill="none" d="M20 0v51" />
              <path stroke="currentColor" strokeWidth={2} fill="none" d="M12 44L20 52 28 44" />
            </svg>
          </a>
        )}
      </div>
    </section>
  );
}