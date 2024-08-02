import { PrismaClient, Prisma } from '@prisma/client'
import { currency } from "@/app/lib/currency";
import type {price} from "@prisma/client";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const prisma = new PrismaClient()

async function GetAllPricesAsync(): Promise<price[]> {
  return prisma
    .price
    .findMany({
                orderBy: [
                  { priority: "asc" }
                ]
              });
}


export default async function Page() {
  const prices = await GetAllPricesAsync();

  return (
    <div className="px-10">
      <h1 className="mb-4 text-xl"><b>Preise</b></h1>
      <table className="min-w-full">
        <tbody>
        { prices
          .map(p =>
                 <tr key={ p.id } className="border-b-amber-100 border-b-[1px]">
                   <td className="py-2"><b>{ p.title }</b><br/>{ p.subtitle }</td>
                   <td className="text-right py-2">{ currency(p.value) }<br/>&nbsp;</td>
                 </tr>
          )
        }
        </tbody>
      </table>
    </div>
  )
}
