import { Period } from "@prisma/client";

export const PERIOD_TYPE_OPTIONS = [
  {
    value: Period.MORNING,
    label: "Manhã",
  },
  {
    value: Period.AFTERNOON,
    label: "Tarde",
  },
  {
    value: Period.NIGHT,
    label: "Noite",
  },
];
