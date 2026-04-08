import styles from "./Calendar.module.css";

type Props = {
  day: number;
  onClick: () => void;
  isSelected: boolean;
  isRange?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  hasNote?: boolean;
  holidayLabel?: string;
};

export default function DayCell({
  day,
  onClick,
  isSelected,
  isRange,
  isStart,
  isEnd,
  hasNote,
  holidayLabel,
}: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.day} ${isSelected ? styles.selected : ""} ${isRange ? styles.range : ""} ${isStart ? styles.start : ""} ${isEnd ? styles.end : ""}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClick();
        }
      }}
      aria-pressed={isSelected}
    >
      <div className={styles.dayCard}>
        <div className={styles.dayCardFace}>
          <span>{day}</span>
          {holidayLabel && <span className={styles.holidayPill}>{holidayLabel}</span>}
        </div>
        <div className={styles.dayCardBack}>
          {isStart && <span className={styles.dayBadge}>Start</span>}
          {isEnd && <span className={styles.dayBadge}>End</span>}
          {isRange && !isStart && !isEnd && <span className={styles.dayBadge}>Range</span>}
        </div>
      </div>
      {hasNote && <span className={styles.dot}></span>}
    </div>
  );
}
