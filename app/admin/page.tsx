import { information, price, PrismaClient, type reservation } from "@prisma/client";
import AdminDashboard from "@/app/ui/admin/dashboard/dashboard";
import Login from "@/app/admin/login/page";

const prisma = new PrismaClient();

async function GetReservationsAsync(): Promise<reservation[]> {
  return prisma
    .reservation
    .findMany();
}

async function GetPricesAsync(): Promise<price[]> {
  return prisma
    .price
    .findMany();
}

async function GetInformationsAsync(): Promise<information[]> {
  return prisma
    .information
    .findMany();
}

export default async function Page() {
  let reservations = await GetReservationsAsync();
  let prices = await GetPricesAsync();
  let informations = await GetInformationsAsync();

  return (
    <>
      <AdminDashboard reservations={reservations} prices={prices} informations={informations}></AdminDashboard>
    </>

  );
}
