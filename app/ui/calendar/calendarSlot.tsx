
export class CalendarDay {
  public day: number;
  public isReserved: boolean;
  public isStartOrEnd: boolean;

  public constructor(day: number, isReserved: boolean, isStartOrEnd: boolean) {
    this.day = day;
    this.isReserved = isReserved;
    this.isStartOrEnd = isStartOrEnd;
  }
}

export default function CalendarSlot({ day } : { day?: CalendarDay }) {
  function getClassName(day?: CalendarDay) {
    if (day == null || (!day.isReserved)) return "";

    if (!day.isStartOrEnd) return "text-red-700";

    return "text-amber-500";
  }

  return (
    <div className={getClassName(day)}>{ day == null ? '' : day.day}</div>
  );
}
