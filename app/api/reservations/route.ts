import { PrismaClient, Prisma } from '@prisma/client'
import type { reservation } from "@prisma/client";
import { headers } from "next/headers";
import { checkTokenAsync } from "@/app/lib/utils";

const prisma = new PrismaClient()

async function CreateAsync(input: reservation): Promise<reservation> {
  input.id = (await GetMaxIdAsync())! + 1;
  SetBillingAddress(input);
  return prisma
    .reservation
    .create({
              data: input
            });
}

async function UpdateAsync(input: reservation) {
  SetBillingAddress(input);
  await prisma
    .reservation
    .update({
              where: { id: input.id },
              data: input
            });
}

function SetBillingAddress(input: reservation) {
  if (input.is_same_as_normal === 0) return;

  input.billing_city = input.city;
  input.billing_country = input.country;
  input.billing_street = input.street;
  input.billing_house_number = input.house_number;
  input.billing_postal_code = input.postal_code;
  input.company_name = input.name;
}

async function GetMaxIdAsync() {
  var agg = await prisma
    .reservation
    .aggregate({
                 _max: { id: true }
               }
    );

  return agg._max.id;
}

export async function GetByIdAsync(id: number): Promise<reservation | null> {
  return prisma
    .reservation
    .findUnique({ where: { id: id } });
}

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
  const headersList = headers();
  const token = headersList.get('Token');

  if (!(await checkTokenAsync(token, prisma))) return Response.json(false);

  const input: reservation = await request.json()

  let id = input.id;

  if (id === 0) {
    const result = await CreateAsync(input);
    id = result.id;
  } else {
    await UpdateAsync(input);
  }

  return Response.json(true);
}
