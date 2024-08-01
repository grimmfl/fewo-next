
import Calendar from "@/app/ui/calendar/calendar";
import { PrismaClient, Prisma } from '@prisma/client'
import type { reservation } from "@prisma/client";

const prisma = new PrismaClient()

async function GetReservationsAsync(): Promise<reservation[]> {
  return prisma
    .reservation
    .findMany();
}




export default async function Page() {
  const reservations = await GetReservationsAsync();

  return (
    <div className="text-center px-10">
      <div className="text-sm mb-5">
        <p>Hier sehen sie unseren Kalender.</p><br/>
        <p>Ist ein Datum <span className="text-red-700">rot</span> markiert, ist die Ferienwohnung an diesem Tag bereits belegt.</p><br/>
        <p>Ist ein Datum <span className="text-amber-500">orange</span> markiert, findet die An- bwz. Abreise der Reservierung statt.</p>
        <br/>
      </div>
      { <Calendar reservations={reservations}></Calendar> }
    </div>
  );
}
