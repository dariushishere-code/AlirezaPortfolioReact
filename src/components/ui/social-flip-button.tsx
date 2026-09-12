import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

export interface SocialItem {
  letter: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SocialFlipButtonProps {
  items?: SocialItem[];
  className?: string;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}

const defaultItems: SocialItem[] = [
  { letter: "C", icon: <FaGithub />, label: "Github", href: "#" },
  { letter: "O", icon: <FaTwitter />, label: "Twitter", href: "#" },
  { letter: "N", icon: <FaLinkedin />, label: "LinkedIn", href: "#" },
  { letter: "T", icon: <FaEnvelope />, label: "Email", href: "#" },
  { letter: "A", icon: <FaGithub />, label: "Github", href: "#" },
  { letter: "C", icon: <FaTwitter />, label: "Twitter", href: "#" },
  { letter: "T", icon: <FaLinkedin />, label: "LinkedIn", href: "#" },
];

const SocialFlipNode = ({
  item,
  index,
  isHovered,
  setTooltipIndex,
  tooltipIndex,
  itemClassName,
  frontClassName,
  backClassName,
}: {
  item: SocialItem;
  index: number;
  isHovered: boolean;
  setTooltipIndex: (val: number | null) => void;
  tooltipIndex: number | null;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}) => {
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: item.onClick };

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "relative h-8 w-8 cursor-pointer sm:h-11 sm:w-11",
        itemClassName
      )}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setTooltipIndex(index)}
      onMouseLeave={() => setTooltipIndex(null)}
    >
      <AnimatePresence>
        {isHovered && tooltipIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -46, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg border border-bone/10 bg-ink-950 px-3 py-1.5 text-xs font-semibold text-bone shadow-xl"
          >
            {item.label}
            {/* Arrow */}
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-bone/10 bg-ink-950" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 120,
          damping: 15,
          delay: index * 0.07,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Letter */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-lg border border-bone/10 bg-ink-850 font-display text-sm font-bold text-bone sm:text-xl",
            frontClassName
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {item.letter}
        </div>

        {/* Back - Icon */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-lg bg-gold-400 text-base text-ink-950 sm:text-xl",
            backClassName
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {item.icon}
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default function SocialFlipButton({
  items = defaultItems,
  className,
  itemClassName,
  frontClassName,
  backClassName,
}: SocialFlipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2 p-2 sm:gap-4 sm:p-4", className)}>
      <div
        className="group relative flex items-center justify-center gap-0 rounded-2xl border border-bone/10 bg-ink-900/70 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:gap-2 sm:p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTooltipIndex(null);
        }}
        onFocusCapture={() => setIsHovered(true)}
        onBlurCapture={() => {
          setIsHovered(false);
          setTooltipIndex(null);
        }}
      >
        {/* Animated border sweep */}
        <div className="pointer-events-none absolute -inset-px overflow-hidden rounded-2xl">
          <motion.div
            className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {items.map((item, index) => (
          <SocialFlipNode
            key={index}
            item={item}
            index={index}
            isHovered={isHovered}
            setTooltipIndex={setTooltipIndex}
            tooltipIndex={tooltipIndex}
            itemClassName={itemClassName}
            frontClassName={frontClassName}
            backClassName={backClassName}
          />
        ))}
      </div>
    </div>
  );
}