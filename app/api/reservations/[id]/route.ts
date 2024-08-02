import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { checkTokenAsync } from "@/app/lib/utils";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient()

export async function DELETE(
  Request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const token = headersList.get('Token');

  if (!(await checkTokenAsync(token, prisma))) return Response.json(false);

  const reservationId = parseInt(params.id, 10);

  await prisma.reservation.delete({
                              where: { id: reservationId },
                            });

  return Response.json(true);
}
