import { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title1: string;
  title2?: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export function SectionHeader({
  label,
  title1,
  title2,
  description,
  align = "center",
  children,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`flex flex-col mb-10 ${isCenter ? "items-center text-center" : "items-start text-left"}`}>
      {/* Label -> Title = 16px (mb-4) */}
      <p className="global-section-label mb-4">
        {label}
      </p>
      
      {/* Title */}
      <h2 className={`global-section-title max-w-[14ch] ${isCenter ? "mx-auto" : ""}`}>
        {title1}
        {title2 && (
          <>
            <br />
            <span className="text-gradient">{title2}</span>
          </>
        )}
      </h2>

      {/* Description & Optional Children */}
      {(description || children) && (
        <div className={`mt-6 w-full sm:max-w-xl ${isCenter ? "mx-auto" : ""} flex flex-col md:flex-row md:items-end justify-between gap-6`}>
          {description && (
            <p className="text-muted-foreground w-full">
              {description}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
