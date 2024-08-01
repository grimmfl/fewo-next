import { information, PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { checkTokenAsync } from "@/app/lib/utils";

const prisma = new PrismaClient()

async function CreateAsync(input: information) {
  input.id = (await GetMaxIdAsync())! + 1;

  return prisma.information.create({
    data: input
                             })
}

async function UpdateAsync(input: information) {
  await prisma
    .information
    .update({
              where: { id: input.id },
              data: input
            });
}

async function GetMaxIdAsync() {
  const agg = await prisma
    .information
    .aggregate({
                 _max: { id: true }
               }
    );

  return agg._max.id;
}

async function GetByIdAsync(id: number): Promise<information | null> {
  return prisma
    .information
    .findUnique({ where: { id: id } });
}


export async function POST(Request: Request) {
  const headersList = headers();
  const token = headersList.get('Token');

  if (!(await checkTokenAsync(token, prisma))) return Response.json(false);

  const input: information = await Request.json();


  let id = input.id;

  if (id === 0) {
    const result = await CreateAsync(input);
    id = result.id;
  } else {
    await UpdateAsync(input);
  }

  return Response.json(true);
}
