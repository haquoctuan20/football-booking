export function roundToNearestHalfHour(date: Date) {
  const roundedDate = new Date(date);
  const minutes = roundedDate.getMinutes();

  const roundingMinutes = (30 - (minutes % 30)) % 30;

  roundedDate.setMinutes(minutes + roundingMinutes);

  roundedDate.setSeconds(0);
  roundedDate.setMilliseconds(0);

  return roundedDate;
}
