import { InternalDate } from "@/app/lib/dateutils";
import { PrismaClient, reservation } from "@prisma/client";
import { ErrorResponse, ErrorType } from "@/app/lib/errorResponse";
import ReactPDF from "@react-pdf/renderer";
import { put } from "@vercel/blob";
import { RegistrationForm } from "@/app/lib/registrationForm";

export const dynamic = 'force-dynamic';

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

  if (reservation == null)
    return Response.json(new ErrorResponse(
      ErrorType.NotFound,
      `Die Reservierung ${ reservationId } existiert nicht.`
    ));

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
    Count: reservation.count == null ? "" : (reservation.count - 1).toString(),
    CompanyName: reservation.is_same_as_normal ? "" : (reservation.company_name ?? ""),
    CompanyAddress: companyAddress,
    Nationality: reservation.nationality ?? "",
    IsSameAsNormal: reservation.is_same_as_normal === 1 ? "Ja" : "Nein"
  };

  const blob = await ReactPDF.pdf(RegistrationForm({ data })).toBlob();

  const filename = `registrationForm_${ reservation.id }.pdf`;

  const result = await put(filename, blob, { access: "public" });

  return Response.json(result);
}
