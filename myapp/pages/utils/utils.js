export function addMinutesToCurrentTime(minutes) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}
