'use client';

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { getDayOfWeek, getDaysInMonth, InternalDate, monthNames, years } from "@/app/lib/dateutils";

import type { reservation } from "@prisma/client";
import CalendarSlot, { CalendarDay } from "@/app/ui/calendar/calendarSlot";


const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

function getMonthMatrix(reservations: reservation[], month: number, year: number) {
  const firstDayOfWeek = getDayOfWeek(1, month, year);
  const monthDays = getDaysInMonth(month, year);

  const result: (CalendarDay | undefined)[][] = [];

  const rows = Math.ceil((monthDays + firstDayOfWeek) / 7);

  for (let i = 0; i < rows; i++) {
    result.push([]);
  }

  const m = month + 1;
  const filter = `${year}-${m < 10 ? ('0' + m) : m}`;
  const daysInMonth = getDaysInMonth(month, year);
  const firstOfMonth = new InternalDate(1, m, year);
  const lastOfMonth = new InternalDate(daysInMonth, m, year);

  const reserved = reservations
    .filter(r => InternalDate.fromString(r.date_from).lessThanEqual(lastOfMonth) && firstOfMonth.lessThanEqual(InternalDate.fromString(r.date_to)))
    .map(r => getReservedDays(r, month, year));

  for (let i = 0; i < rows * 7; i++) {
    const rowIndex = Math.floor(i / 7);

    if (i < firstDayOfWeek) result[rowIndex].push(undefined);
    else if (i >= firstDayOfWeek && i - firstDayOfWeek < monthDays) {
      const day = i - firstDayOfWeek + 1;
      const indices: {values: number[], idx: number}[] = reserved
        .map(r => ({ values: r, idx: r.indexOf(day)}))
        .filter(obj => obj.idx !== -1);

      const isReserved = indices.length > 0;

      const isStartOrEnd = isReserved && (indices[0].values[0] === day || indices[0].values[indices[0].values.length - 1] === day);
      result[rowIndex].push(new CalendarDay(day, isReserved, isStartOrEnd));
    }
    else result[rowIndex].push(undefined);
  }

  return result;
}

function getReservedDays(reservation: reservation, month: number, year: number) {
  const m = month + 1;
  const daysInMonth = getDaysInMonth(month, year);

  const from = InternalDate.fromString(reservation.date_from);
  const to = InternalDate.fromString(reservation.date_to);

  const first = new InternalDate(1, m, year);
  const last = new InternalDate(daysInMonth, m, year);

  if (last.lessThan(from)) return [];

  if (to.lessThan(first)) return [];

  const dayFrom = from.month === m && from.year === year ? from.day : 1;
  const dayTo = to.month === m && to.year === year ? to.day : daysInMonth;

  return Array.from({ length: dayTo - dayFrom + 1 }, (_, i) => dayFrom + i);
}

export default function Calendar({ reservations }: { reservations: reservation[]}) {
  function monthChangeHandler(event: any) {
    setMonth(parseInt(event.target.value, 10));
  }

  function yearChangeHandler(event: any) {
    setYear(parseInt(event.target.value, 10));
  }

  function selectNextMonth() {
    const next = month + 1;

    if (next < 12) {
      setMonth(next);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  }

  function selectPreviousMonth() {
    const prev = month - 1;

    if (prev >= 0) {
      setMonth(prev);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  }

  let [month, setMonth] = useState(currentMonth);
  let [year, setYear] = useState(currentYear);

  let monthMatrix = getMonthMatrix(reservations, month, year);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center mb-5">

        <button onClick={ selectPreviousMonth }><ChevronLeftIcon
          className="w-6 mr-2 text-amber-500"/></button>

        <select value={ month }
                className="form-select bg-no-repeat appearance-none bg-transparent border-b-2 border-b-amber-500 border-t-0 border-r-0 border-l-0 rounded-none mr-4 w-36"
                onChange={ monthChangeHandler }>
          { monthNames.map((m, idx) =>
                             <option key={ idx } value={ idx }>{ m }</option>
          ) }
        </select>

        <select value={ year }
                className="form-select bg-no-repeat appearance-none bg-transparent border-b-2 border-b-amber-500 border-t-0 border-r-0 border-l-0 rounded-none w-36"
                onChange={ yearChangeHandler }>
          { years.map((year, idx) =>
                        <option key={ idx } value={ year }>{ year }</option>) }
        </select>

        <button onClick={ selectNextMonth }><ChevronRightIcon className="w-6 ml-2 text-amber-500"/>
        </button>

      </div>

      <table>
        <thead>
        <tr className="border-b-amber-100 border-b-[1px]">
          <th className="w-20 text-center py-2">Mo</th>
          <th className="w-20 text-center py-2">Di</th>
          <th className="w-20 text-center py-2">Mi</th>
          <th className="w-20 text-center py-2">Do</th>
          <th className="w-20 text-center py-2">Fr</th>
          <th className="w-20 text-center py-2">Sa</th>
          <th className="w-20 text-center py-2">So</th>
        </tr>
        </thead>
        <tbody>
        { monthMatrix.map((w, w_idx) =>
                            <tr key={ w_idx } className="border-b-amber-100 border-b-[1px]">
                              { w.map((d, d_idx) =>
                                        <td key={ w_idx * 7 + d_idx }
                                            className="text-center py-2"><CalendarSlot day={d}></CalendarSlot></td>
                              ) }
                            </tr>
        ) }
        </tbody>
      </table>
    </div>
  )
}
