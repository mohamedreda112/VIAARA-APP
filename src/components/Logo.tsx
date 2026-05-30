import logo from "@/assets/viaara-logo.png";

export function Logo({ size = 36, withWord = true }: { size?: number; withWord?: boolean }) {
  // The provided logo is a horizontal lockup (mark + wordmark).
  // When `withWord` is true → render the full lockup.
  // When false → still render the lockup but smaller; it serves as the brand watermark.
  const height = size;
  return (
    <div className="flex items-center">
      <img
        src={logo}
        alt="VIAARA"
        className={`object-contain ${withWord ? "drop-shadow-[0_0_24px_rgba(63,207,213,0.45)]" : "drop-shadow-[0_0_40px_rgba(63,207,213,0.55)]"}`}
        style={{ height, width: "auto" }}
      />
    </div>
  );
}
