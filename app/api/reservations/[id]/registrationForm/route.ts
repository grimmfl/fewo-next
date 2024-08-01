import { promises as fs } from 'fs';
import { InternalDate } from "@/app/lib/dateutils";
import { PrismaClient, reservation } from "@prisma/client";

const Mustache = require('mustache');
const puppeteer = require('puppeteer');

const prisma = new PrismaClient()

async function GetByIdAsync(id: number): Promise<reservation | null> {
  return prisma
    .reservation
    .findUnique({ where: { id: id } });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const reservationId = parseInt(params.id, 10);
  const reservation = await GetByIdAsync(reservationId);

  if (reservation == null) throw Error("reservation does not exist");

  const template = await fs.readFile(process.cwd() + '/public/RegistrationForm.html', "utf-8");

  const companyAddress = reservation.is_same_as_normal
    ? ""
    : `${reservation.billing_street} ${reservation.billing_house_number} | ${reservation.billing_city} ${reservation.billing_postal_code} | ${reservation.billing_country}`;

  const data =
  {
    DateFrom: InternalDate.fromString(reservation.date_from).toPrettyString(),
    DateTo: InternalDate.fromString(reservation.date_to).toPrettyString(),
    Name:reservation.name,
    Street: reservation.street ?? "",
    HouseNumber: reservation.house_number ?? "",
    PostalCode: reservation.postal_code ?? "",
    City: reservation.city ?? "",
    Country: reservation.country ?? "",
    Count: reservation.count == null ? "" : (reservation.count - 1),
    CompanyName: reservation.is_same_as_normal ? "" : (reservation.company_name ?? ""),
    CompanyAddress: companyAddress,
  };

  const rendered = Mustache.render(template, data);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(rendered);
  await page.pdf({ path: process.cwd() + "/public/RegistrationForm.pdf", format: 'A4' });
  await browser.close();

  return Response.json(true);
}
