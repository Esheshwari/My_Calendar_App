"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./Calendar.module.css";
import DayCell from "./DayCell";
import { getDaysInMonth, holidays, monthImages, monthThemes } from "../utils/calendar";

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function normalize(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatLabel(date: Date) {
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function Calendar() {
  const today = useMemo(() => normalize(new Date()), []);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [noteText, setNoteText] = useState("");
  const [monthlyMemo, setMonthlyMemo] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">(monthThemes[new Date().getMonth()] ?? "light");
  const [isChangingMonth, setIsChangingMonth] = useState(false);
  const [userHolidays, setUserHolidays] = useState<Set<string>>(new Set());
  const [currentDate, setCurrentDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const firstWeekday = useMemo(() => normalize(new Date(year, month, 1)).getDay(), [year, month]);

  const selectionKey = useMemo(() => {
    if (!selectedStart) return "";
    if (!selectedEnd) return `date:${formatDate(selectedStart)}`;
    return `range:${formatDate(selectedStart)}|${formatDate(selectedEnd)}`;
  }, [selectedStart, selectedEnd]);

  const activeNote = selectionKey ? notes[selectionKey] || "" : "";
  const imageTheme = monthThemes[month] ?? "light";

  useEffect(() => {
    setNoteText(activeNote);
  }, [activeNote]);

  useEffect(() => {
    setTheme(imageTheme);
  }, [imageTheme]);

  function changeMonth(delta: number) {
    setIsChangingMonth(true);
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + delta);
      return newDate;
    });
  }

  useEffect(() => {
    if (!isChangingMonth) return;
    const timeout = window.setTimeout(() => setIsChangingMonth(false), 360);
    return () => window.clearTimeout(timeout);
  }, [isChangingMonth, month]);

  function handleDayClick(day: Date) {
    const normalizedDay = normalize(day);

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(normalizedDay);
      setSelectedEnd(null);
      return;
    }

    if (selectedStart && !selectedEnd) {
      if (normalizedDay.getTime() < selectedStart.getTime()) {
        setSelectedStart(normalizedDay);
        return;
      }

      if (normalizedDay.getTime() === selectedStart.getTime()) {
        setSelectedStart(normalizedDay);
        return;
      }

      setSelectedEnd(normalizedDay);
    }
  }

  function saveNote() {
    if (!selectionKey) return;
    setNotes((current) => ({
      ...current,
      [selectionKey]: noteText.trim(),
    }));
  }

  function clearSelection() {
    setSelectedStart(null);
    setSelectedEnd(null);
    setNoteText("");
  }

  function toggleHoliday(dayKey: string) {
    setUserHolidays((current) => {
      const newSet = new Set(current);
      if (newSet.has(dayKey)) {
        newSet.delete(dayKey);
      } else {
        newSet.add(dayKey);
      }
      return newSet;
    });
  }

  const monthImage = monthImages[month] || "/images/default.jpg";

  const savedNotes = useMemo(
    () =>
      Object.entries(notes)
        .filter(([key]) => key.startsWith("date:"))
        .map(([key, text]) => ({
          date: key.replace("date:", ""),
          text,
        })),
    [notes],
  );

  return (
    <div className={`${styles.pageWrapper} ${theme === "dark" ? styles.dark : ""}`}>
      <main className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <p className={styles.appBrand}>TakeUForward Calendar</p>
          </div>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "Night mode" : "Day mode"}
          </button>
        </div>
        <div className={styles.bindingRow} aria-hidden="true">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className={styles.bindingRing} />
          ))}
        </div>

        <section className={`${styles.calendarShell} ${isChangingMonth ? styles.fade : ""}`}>
          <article className={styles.heroPanel}>
            <div className={styles.heroHeader}>
              <div>
                <p className={styles.tag}>TakeUForward Calendar</p>
                <h1 className={styles.heroTitle}>{monthNames[month]}</h1>
                <p className={styles.heroSubtitle}>{year}</p>
              </div>
            </div>

            <div className={styles.heroImage}>
              <div className={styles.heroImageOverlay}>
                <span className={styles.heroImageLabel}>{monthNames[month]}</span>
                <strong className={styles.heroImageDate}>{year}</strong>
              </div>
              <Image
                src={monthImage}
                alt={`${monthNames[month]} hero image`}
                fill
                className={styles.heroImg}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className={styles.heroNotes}>
              <p className={styles.heroNotesTitle}>Every month has a story.</p>
              <p className={styles.heroNotesText}>
                Select a start date, then an end date, and add notes for the day or the full range. The page feels like a physical print-out framed on a wall.
              </p>
            </div>
          </article>

          <article className={styles.bodyPanel}>
            <div className={styles.controlsBar}>
              <div className={styles.navButtons}>
                <button type="button" className={styles.primaryButton} onClick={() => changeMonth(-1)}>
                  <span className={styles.buttonIcon}>‹</span>
                  Previous
                </button>
                <button type="button" className={styles.primaryButton} onClick={() => changeMonth(1)}>
                  Next
                  <span className={styles.buttonIcon}>›</span>
                </button>
              </div>
              <div className={styles.summaryCard}>
                <span>{selectedStart ? (selectedEnd ? "Range selected" : "Single date selected") : "Choose dates"}</span>
                <strong>
                  {selectedStart
                    ? selectedEnd
                      ? `${formatLabel(selectedStart)} — ${formatLabel(selectedEnd)}`
                      : formatLabel(selectedStart)
                    : "Tap a day"}
                </strong>
              </div>
            </div>
            <div className={styles.legendBar}>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.legendHoliday}`} />
                User-added holiday marker
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.legendNote}`} />
                Saved note
              </div>
            </div>

            <div className={styles.calendarGrid}>
              {weekdayLabels.map((label) => (
                <div key={label} className={styles.weekdayLabel}>
                  {label}
                </div>
              ))}
              {Array.from({ length: firstWeekday }).map((_, index) => {
                const prevMonthLastDay = new Date(year, month, 0).getDate();
                const dayNum = prevMonthLastDay - firstWeekday + index + 1;
                return (
                  <div key={`prev-${index}`} className={styles.prevMonthCell}>
                    {dayNum}
                  </div>
                );
              })}
              {days.map((day) => {
                const dayKey = formatDate(day);
                const isStart = selectedStart?.getTime() === day.getTime();
                const isEnd = selectedEnd?.getTime() === day.getTime();
                const inRange = Boolean(
                  selectedStart &&
                  selectedEnd &&
                  day.getTime() > selectedStart.getTime() &&
                  day.getTime() < selectedEnd.getTime(),
                );
                const hasNote = Boolean(notes[`date:${dayKey}`]);
                const isHoliday = userHolidays.has(dayKey);

                return (
                  <DayCell
                    key={dayKey}
                    day={day.getDate()}
                    onClick={() => handleDayClick(day)}
                    onContextMenu={(e: React.MouseEvent) => { e.preventDefault(); toggleHoliday(dayKey); }}
                    isSelected={Boolean(isStart || isEnd || inRange)}
                    isStart={isStart}
                    isEnd={isEnd}
                    isRange={inRange}
                    hasNote={hasNote}
                    isHoliday={isHoliday}
                  />
                );
              })}
              {(() => {
                const totalCellsSoFar = weekdayLabels.length + firstWeekday + days.length;
                const nextCells = 42 - totalCellsSoFar;
                return Array.from({ length: nextCells }).map((_, index) => (
                  <div key={`next-${index}`} className={styles.nextMonthCell}>
                    {index + 1}
                  </div>
                ));
              })()}
            </div>

            <div className={styles.noteSection}>
              <div className={styles.noteHeader}>
                <div>
                  <p className={styles.noteLabel}>Selected entry</p>
                  <h2 className={styles.noteTitle}>
                    {selectionKey
                      ? selectedEnd
                        ? `Range ${formatLabel(selectedStart!)} — ${formatLabel(selectedEnd!)}`
                        : formatLabel(selectedStart!)
                      : "Pick a start date"}
                  </h2>
                </div>
                <button type="button" className={styles.clearButton} onClick={clearSelection}>
                  <span className={styles.buttonIcon}>⟲</span>
                  Clear selection
                </button>
              </div>

              <textarea
                className={styles.noteInput}
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
                placeholder={
                  selectionKey
                    ? selectedEnd
                      ? "Write a note for this date range"
                      : "Write a note for this date"
                    : "Select a date to add a note"
                }
              />
              <div className={styles.noteActions}>
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={saveNote}
                  disabled={!selectionKey}
                >
                  Save note
                </button>
                {selectionKey && !selectedEnd && (
                  <button
                    type="button"
                    className={styles.holidayButton}
                    onClick={() => toggleHoliday(selectionKey.replace("date:", ""))}
                  >
                    {userHolidays.has(selectionKey.replace("date:", "")) ? "Unmark Holiday" : "Mark as Holiday"}
                  </button>
                )}
                <button type="button" className={styles.monthMemoButton} onClick={() => setMonthlyMemo((current) => current)}>
                  Monthly memo
                </button>
              </div>

              <div className={styles.monthMemoSection}>
                <label className={styles.memoLabel} htmlFor="monthlyMemo">
                  General memo for {monthNames[month]}
                </label>
                <textarea
                  id="monthlyMemo"
                  className={styles.monthMemoInput}
                  value={monthlyMemo}
                  onChange={(event) => setMonthlyMemo(event.target.value)}
                  placeholder="Capture the mood of the month, a project note, or a reminder."
                />
              </div>

              <div className={styles.savedNotesPanel}>
                <h3>Saved notes</h3>
                {savedNotes.length > 0 ? (
                  <ul className={styles.savedNotesList}>
                    {savedNotes.slice(-4).map((entry) => (
                      <li key={entry.date}>
                        <strong>{new Date(entry.date).toLocaleDateString()}</strong>
                        <p>{entry.text}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.savedNotesEmpty}>No notes saved yet. Add a note to see it here.</p>
                )}
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
