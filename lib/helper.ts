import { format } from "date-fns";

// "9:30 AM" — used anywhere a time-only string is needed (slot buttons, appointment rows)
export function formatTime({ date }: { date: Date }) {
  return format(new Date(date), "h:mm a");
}
