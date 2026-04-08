export function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

export const monthImages: Record<number, string> = {
  0: "/images/jan.jpg",
  1: "/images/feb.jpg",
  2: "/images/mar.jpg",
  3: "/images/apr.jpg",
  4: "/images/may.jpg",
  5: "/images/jun.jpg",
  6: "/images/jul.jpg",
  7: "/images/aug.jpg",
  8: "/images/sep.jpg",
  9: "/images/oct.jpg",
  10: "/images/nov.jpeg",
  11: "/images/dec.jpg",
};

export const monthThemes: Record<number, "light" | "dark"> = {
  0: "dark",
  1: "light",
  2: "light",
  3: "light",
  4: "light",
  5: "dark",
  6: "light",
  7: "dark",
  8: "dark",
  9: "dark",
  10: "light",
  11: "dark",
};

export const holidays: Record<string, string> = {
  "2026-01-01": "New Year's Day",
  "2026-02-14": "Valentine's Day",
  "2026-03-17": "St. Patrick's Day",
  "2026-04-22": "Earth Day",
  "2026-05-01": "Labor Day",
  "2026-06-21": "Summer Solstice",
  "2026-07-04": "Independence Day",
  "2026-08-15": "Heritage Day",
  "2026-09-21": "Peace Day",
  "2026-10-31": "Halloween",
  "2026-11-25": "Autumn Festival",
  "2026-12-24": "Winter Eve",
};
