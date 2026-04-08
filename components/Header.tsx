"use client";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
};

export default function Header({
  onPrev,
  onNext,
  onToggleTheme,
  isDark,
}: Props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px" }}>
      <div>
        <button onClick={onPrev}>Prev</button>
        <button onClick={onNext} style={{ marginLeft: 10 }}>Next</button>
      </div>

      <button onClick={onToggleTheme}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}