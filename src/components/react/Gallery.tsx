import { useCallback, useEffect, useMemo, useState } from 'react';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  alt?: string;
  // image
  thumbSrc?: string;
  thumbSrcset?: string;
  fullSrc?: string;
  width?: number;
  height?: number;
  // video
  provider?: 'youtube' | 'vimeo';
  videoId?: string;
}

interface Props {
  items: GalleryItem[];
  categories: string[];
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function gradientFor(seed: string) {
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const hue = hash % 360;
  return `linear-gradient(135deg, hsl(${hue} 70% 22%), hsl(${(hue + 55) % 360} 65% 12%))`;
}

function embedUrl(item: GalleryItem) {
  if (item.provider === 'youtube')
    return `https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`;
  if (item.provider === 'vimeo')
    return `https://player.vimeo.com/video/${item.videoId}?autoplay=1`;
  return '';
}

export default function Gallery({ items, categories }: Props) {
  const [active, setActive] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === 'all' ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  // Reset lightbox if the filter changes underneath it.
  useEffect(() => setOpenIndex(null), [active]);

  const close = useCallback(() => setOpenIndex(null), []);
  const show = useCallback(
    (dir: number) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(1);
      else if (e.key === 'ArrowLeft') show(-1);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, show]);

  const tabs = ['all', ...categories];
  const current = openIndex === null ? null : filtered[openIndex];

  return (
    <div>
      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter media by category">
        {tabs.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              aria-pressed={isActive}
              className={
                'rounded-full border px-3.5 py-1.5 text-sm transition ' +
                (isActive
                  ? 'border-nebula-400/60 bg-nebula-500/15 text-nebula-200'
                  : 'border-white/10 bg-white/[0.03] text-ink-300 hover:text-ink-50')
              }
            >
              {tab === 'all' ? 'All' : cap(tab)}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-ink-400">Nothing here yet. 🛰️</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-space-800 focus-visible:outline-2 focus-visible:outline-cosmic-400"
                aria-label={`Open ${item.title}`}
              >
                {item.type === 'image' && item.thumbSrc ? (
                  <img
                    src={item.thumbSrc}
                    srcSet={item.thumbSrcset}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    alt={item.alt ?? item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: item.thumbSrc ? undefined : gradientFor(item.title) }}
                  >
                    {item.thumbSrc && (
                      <img
                        src={item.thumbSrc}
                        alt={item.alt ?? item.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                  </span>
                )}

                {/* Video play badge */}
                {item.type === 'video' && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition group-hover:scale-110">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                )}

                {/* Caption */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 text-left">
                  <span className="block truncate text-xs font-medium text-white">{item.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            ✕
          </button>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); show(-1); }}
                aria-label="Previous"
                className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); show(1); }}
                aria-label="Next"
                className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:right-6"
              >
                ›
              </button>
            </>
          )}

          <figure
            className="max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === 'video' ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                <iframe
                  src={embedUrl(current)}
                  title={current.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={current.fullSrc}
                alt={current.alt ?? current.title}
                className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain"
              />
            )}
            <figcaption className="mt-3 text-center text-sm text-ink-300">
              {current.title} · <span className="text-ink-500">{cap(current.category)}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
