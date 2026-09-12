import React from "react";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt?: string;
}

export interface CylinderCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number; // seconds per revolution
  cardWidth?: number; // px
  radius?: number; // px — distance cards orbit from the axis; defaults to the exact fit for N cards
  perspective?: string; // CSS perspective of the 3D stage (e.g. "52em")
}

export const CylinderCarousel = React.forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    {
      images,
      className,
      containerClassName,
      cardClassName,
      animationDuration = 32,
      cardWidth = 250,
      radius,
      perspective = "35em",
      ...props
    },
    ref
  ) => {
    const N = images.length;

    // Geometric "perfect fit" radius for N cards: the tightest cylinder where
    // neighbours touch — larger radius means cards float further away.
    const fitRadius = (0.5 * cardWidth + 8) / Math.tan(Math.PI / N);
    const ringRadius = radius ?? fitRadius;

    const customStyle = {
      "--n": N,
      "--w": `${cardWidth}px`,
      "--ba": `calc(1turn / var(--n))`,
      "--rz": `${ringRadius}px`,
      "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn("w-full h-full min-h-[500px] grid place-items-center overflow-hidden", className)}
        style={{
          perspective,
          maskImage: "linear-gradient(90deg, transparent, #000 16% 84%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 16% 84%, transparent)",
        }}
        {...props}
      >
        <div
          className={cn(
            "grid place-items-center [transform-style:preserve-3d] will-change-transform motion-reduce:!animate-[ry_128s_linear_infinite]",
            containerClassName
          )}
          style={{
            ...customStyle,
            animation: `ry var(--anim-dur) linear infinite`,
          }}
        >
          {/* Keyframes are inlined so the carousel works without global CSS config */}
          <style>
            {`
              @keyframes ry {
                to { transform: rotateY(1turn); }
              }
            `}
          </style>

          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt || `Orbit frame ${i}`}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={cn(
                "[grid-area:1/1] object-cover rounded-2xl [backface-visibility:hidden] select-none",
                cardClassName
              )}
              style={{
                width: "var(--w)",
                aspectRatio: "7/10",
                "--i": i,
                transform: "rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * var(--rz)))",
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";

export default CylinderCarousel;