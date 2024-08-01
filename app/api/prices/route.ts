import { price, PrismaClient, type reservation } from "@prisma/client";
import { headers } from "next/headers";
import { checkTokenAsync } from "@/app/lib/utils";

const prisma = new PrismaClient()

const doNothing = {
  id: undefined,
  title: undefined,
  subtitle: undefined,
  price: undefined,
  priority: undefined
};

export async function PUT(Request: Request) {
  const headersList = headers();
  const token = headersList.get('Token');

  if (!(await checkTokenAsync(token, prisma))) return Response.json(false);

  const prices: price[] = await Request.json();

  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];

    await prisma.price.update({
                                where: { id: price.id },
                                data: { ...doNothing, priority: price.priority }
                              }
    );
  }

  return Response.json(true);
}

async function CreateAsync(input: price) {
  input.id = (await GetMaxIdAsync())! + 1;

  return prisma.price.create({
    data: input
                             })
}

async function UpdateAsync(input: price) {
  await prisma
    .price
    .update({
              where: { id: input.id },
              data: input
            });
}

async function GetMaxIdAsync() {
  const agg = await prisma
    .price
    .aggregate({
                 _max: { id: true }
               }
    );

  return agg._max.id;
}

async function GetByIdAsync(id: number): Promise<price | null> {
  return prisma
    .price
    .findUnique({ where: { id: id } });
}


export async function POST(Request: Request) {
  const headersList = headers();
  const token = headersList.get('Token');

  if (!(await checkTokenAsync(token, prisma))) return Response.json(false);

  const input: price = await Request.json();


  let id = input.id;

  if (id === 0) {
    const result = await CreateAsync(input);
    id = result.id;
  } else {
    await UpdateAsync(input);
  }

  return Response.json(true);
}
