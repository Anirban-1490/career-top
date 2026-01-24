import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
export function getDateDuration(day = 1) {
  const today = dayjs().day();

  let dayLeft = (day - today + 7) % 7;

  if (dayLeft === 0) {
    dayLeft = 7;
  }

  return dayjs().add(dayLeft, "days").toString();
}
