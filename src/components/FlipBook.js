'use client';

import dynamic from 'next/dynamic';
import { forwardRef, useEffect, useState } from 'react';

const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((mod) => mod.default),
  { ssr: false },
);

const Page = forwardRef(function Page({ children, bg }, ref) {
  return (
    <div
      ref={ref}
      className="block w-full h-full m-0 p-0 overflow-hidden"
      style={{ background: bg }}
    >
      <div className="w-full h-full flex items-center justify-center text-white text-5xl font-semibold tracking-wide select-none">
        {children}
      </div>
    </div>
  );
});

const PAGES = [
  { label: 'Page 1', bg: '#0f172a' },
  { label: 'Page 2', bg: '#1e3a8a' },
  { label: 'Page 3', bg: '#7c3aed' },
  { label: 'Page 4', bg: '#be185d' },
  { label: 'Page 5', bg: '#b45309' },
  { label: 'Page 6', bg: '#065f46' },
];

export default function FlipBook() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    const update = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  if (!size) return null;

  return (
    <HTMLFlipBook
      width={size.w}
      height={size.h}
      size="stretch"
      minWidth={1}
      maxWidth={size.w}
      minHeight={1}
      maxHeight={size.h}
      drawShadow={false}
      maxShadowOpacity={0}
      showCover={false}
      mobileScrollSupport={false}
      useMouseEvents
      flippingTime={650}
      usePortrait
      startZIndex={0}
      autoSize={false}
      showPageCorners={false}
      disableFlipByClick={false}
      clickEventForward
      swipeDistance={30}
      startPage={0}
      className="flipbook-root"
      style={{ margin: 0, padding: 0 }}
    >
      {PAGES.map((p) => (
        <Page key={p.label} bg={p.bg}>
          {p.label}
        </Page>
      ))}
    </HTMLFlipBook>
  );
}
