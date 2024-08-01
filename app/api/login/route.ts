import { PrismaClient, type user } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(Request: Request) {
  const { password }: { password: string } = await Request.json();

  const users = await prisma.user.findMany({});

  for (const user of users) {
    if (await bcrypt.compare(password, user.password)) {
      const token = await generateTokenAsync(user);

      return Response.json(token);
    }
  }

  return Response.json(false);


}

async function createUserAsync() {
  await prisma.user.create({
                             data: {
                               id: 2,
                               name: "Peter",
                               password: await encryptPassword("M0notones")
                             }
                           })
}

async function generateTokenAsync(user: user) {
  const expire = new Date();
  expire.setUTCHours(expire.getHours() + 1);
  const expireStamp = expire.getTime();

  const token = `${ await encryptPassword(user.password) }:${ expireStamp }`

  await prisma.user.update({
                       where: {
                         id: user.id
                       },
                       data: {
                         id: undefined,
                         name: undefined,
                         password: undefined,
                         token: token
                       }
                     })

  return token;
}

async function encryptPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
