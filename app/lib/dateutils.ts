export const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
export const years = Array.from({ length: 100 }, (_, i) => 2020 + i);
export const daysInMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getDaysInMonth(month: number, year: number) {
  if (month == 1) return isLeapYear(year) ? 29 : 28;

  return daysInMonth[month];
}

export function isLeapYear(year: number) {
  return year % 4 === 0 && (!(year % 100 === 0) || year % 400 === 0);
}

export function getDayOfWeek(day: number, month: number, year: number) {
  return (new Date(year, month, day).getDay() + 6) % 7;
}

export class InternalDate {
  public readonly day: number;
  public readonly month: number;
  public readonly year: number;

  public constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  static fromString(value: string): InternalDate {
    const splitted = value.split("-");

    const [day_from, month_from, year_from] = [
      parseInt(splitted[2].split(" ")[0], 10),
      parseInt(splitted[1], 10),
      parseInt(splitted[0], 10)
    ];

    return new InternalDate(day_from, month_from, year_from);
  }

  static now(): InternalDate {
    const date = new Date();

    return new InternalDate(date.getDate(), date.getMonth() + 1, date.getFullYear())
  }

  toPrettyString() {
    const day = this.day < 10 ? `0${this.day}` : this.day.toString();
    const month = this.month < 10 ? `0${this.month}` : this.month.toString();
    return `${day}.${month}.${this.year}`;
  }

  toJsDate() {
    return new Date(this.year, this.month - 1, this.day);
  }

  toString() {
    return `${this.year}-${this.month}-${this.day}`;
  }

  lessThan(other: InternalDate): boolean {
    if (this.year < other.year) return true;

    if (this.year === other.year && this.month < other.month) return true;

    if (this.year === other.year && this.month === other.month && this.day < other.day) return true;

    return false;
  }

  delta(other: InternalDate): number {
    const [smallerDate, greaterDate] = this.lessThan(other) ? [this, other] : [other, this];

    if (smallerDate.year < greaterDate.year) {
      return smallerDate.delta(new InternalDate(31, 12, greaterDate.year - 1)) + greaterDate.delta(new InternalDate(1, 1, greaterDate.year));
    }

    if (smallerDate.month < greaterDate.month) {
      const year = smallerDate.year;

      const monthIndex = greaterDate.month - 1;
      const monthBeforeIndex = (monthIndex + 11) % 12;

      return smallerDate.delta(new InternalDate(getDaysInMonth(monthBeforeIndex, year), monthBeforeIndex + 1, year)) + greaterDate.delta(new InternalDate(1, greaterDate.month, year));
    }

    return greaterDate.day - smallerDate.day;
  }

  lessThanEqual(other: InternalDate): boolean {
    if (this.year === other.year && this.month === other.month && this.day == other.day) return true;

    return this.lessThan(other);
  }

}
