export const SemesterOptions = [
  { value: "Summer", label: "Summer" },
  { value: "Autumn", label: "Autumn" },
  { value: "Fall", label: "Fall" },
];

const currentYear = new Date().getFullYear();
export const yearOptions = [...Array(5)].map((_, index) => ({
  value: String(currentYear + index),
  label: String(currentYear + index),
}));

export const SemesterStatusOption = [
  { value: "UPCOMING", label: "UPCOMING" },
  { value: "ONGOING", label: "ONGOING" },
  { value: "ENDED", label: "ENDED" },
];
