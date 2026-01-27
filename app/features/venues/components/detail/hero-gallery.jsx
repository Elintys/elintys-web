export default function HeroGallery({ images, title }) {
  return (
    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
      {(images || []).map((src, index) => (
        <div key={`${src}-${index}`} className="min-w-[70%] snap-start">
          <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100">
            <img
              src={src}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      ))}
      {!images?.length && (
        <div className="min-w-[70%] snap-start">
          <div className="aspect-[16/10] rounded-3xl bg-slate-100" />
        </div>
      )}
    </div>
  );
}
