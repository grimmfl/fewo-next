import { promises as fs } from 'fs';
import { PrismaClient, Prisma } from '@prisma/client'
import type { reservation } from "@prisma/client";
import { InternalDate } from "@/app/lib/dateutils";
import { currency } from "@/app/lib/currency";
import { headers } from "next/headers";
import { checkTokenAsync } from "@/app/lib/utils";
import path from "node:path";

const Mustache = require('mustache');
const puppeteer = require('puppeteer');

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient()

async function GetByIdAsync(id: number): Promise<reservation | null> {
  return prisma
    .reservation
    .findUnique({ where: { id: id } });
}

async function GetInvoiceNumberForYearAsync(year: number) {
  return prisma.invoice_number.findUnique({
                                            where: { year: year }
                                          });
}

async function AddInvoiceNumberYearAsync(year: number) {
  return prisma.invoice_number.create({
                                        data: {
                                          year: year,
                                          number: 1
                                        }
                                      });
}

async function SetInvoiceNumberAsync(year: number, number: number) {
  await prisma.invoice_number.update({
                                 where: { year: year },
                                 data: {
                                   year: year,
                                   number: number
                                 }
                               });
}

async function SetInvoiceNumberOnReservationAsync(number: string, reservation: reservation) {
  await prisma.reservation.update({
                              where: { id: reservation.id },
                              data: {
                                invoice_number: number,
                                id: undefined,
                                date_from: undefined,
                                date_to: undefined,
                                name: undefined,
                                count: undefined,
                                price: undefined,
                                email: undefined,
                                phone: undefined,
                                nationality: undefined,
                                street: undefined,
                                house_number: undefined,
                                postal_code: undefined,
                                city: undefined,
                                country: undefined,
                                invoice_type: undefined,
                                is_same_as_normal: undefined,
                                billing_street: undefined,
                                billing_house_number: undefined,
                                billing_postal_code: undefined,
                                billing_city: undefined,
                                billing_country: undefined,
                                company_name: undefined,
                              }
                            });
}

async function GenerateInvoiceNumberAsync(reservation: reservation) {
  const year = InternalDate.now().year;

  let entry = await GetInvoiceNumberForYearAsync(year);

  if (entry === null) entry = await AddInvoiceNumberYearAsync(year);

  let numberString = entry.number.toString();
  while (numberString.length < 3) numberString = "0" + numberString;

  const result = `RE-${ year }-${ numberString }`;

  await SetInvoiceNumberAsync(year, entry.number + 1);

  await SetInvoiceNumberOnReservationAsync(result, reservation);

  return result;
}


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const token = headersList.get('Token');

  if (!(await checkTokenAsync(token, prisma))) return Response.json(false);

  const reservationId = parseInt(params.id, 10);
  const reservation = await GetByIdAsync(reservationId);

  if (reservation == null) throw Error("reservation does not exist");

  if (reservation.invoice_type === 0) return Response.json(false);

  const staticLoc = process.env.NODE_ENV === 'production' ? 'static' : 'public';

  const file = path.join(path.resolve("./public", "Invoice.html"));
  const template = await fs.readFile(file, "utf-8");

  const dateFrom = InternalDate.fromString(reservation.date_from);
  const dateTo = InternalDate.fromString(reservation.date_to);

  const nights = dateTo.delta(dateFrom);
  const countString = reservation.count == null
    ? ""
    : nights.toString() +
    (nights == 1 ? " Übernachtung" : " Übernachtungen");

  const invoiceNumber = reservation.invoice_number ?? await GenerateInvoiceNumberAsync(reservation);

  const data = {
    BillingName: reservation.company_name ?? reservation.name,
    BillingStreet: reservation.billing_street ?? "",
    BillingHouseNumber: reservation.billing_house_number ?? "",
    BillingCity: reservation.billing_city ?? "",
    BillingPostalCode: reservation.billing_postal_code ?? "",
    BillingCountry: reservation.billing_country ?? "",
    InvoiceNumber: invoiceNumber,
    DateFrom: dateFrom.toPrettyString(),
    Name: reservation.name,
    DateValue: dateFrom.toPrettyString(),
    DateTo: dateTo.toPrettyString(),
    Count: reservation.count == null ? "" : reservation.count.toString(),
    CountString: countString,
    PriceString: currency(reservation.price ?? 0),
  };


  const rendered = Mustache.render(template, data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(rendered);
  await page.pdf({ path: process.cwd() + `/${staticLoc}/Invoice.pdf`, format: 'A4' });
  await browser.close();

  return Response.json(true);
}
