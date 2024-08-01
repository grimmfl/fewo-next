import { type user, PrismaClient } from "@prisma/client";

const crypto = require('crypto');

const prisma = new PrismaClient();

export async function POST(Request: Request) {
  const { password }: { password: string } = await Request.json();

  const encrypted = encryptPassword(password);

  const user = await prisma.user.findFirst({
                                             where: { password: encrypted }
                                           });

  if (user == null) return Response.json(false);

  const token = await generateTokenAsync(user);

  return Response.json(token);
}

async function createUserAsync() {
  await prisma.user.create({
                             data: {
                               id: 3,
                               name: "Peter",
                               password: encryptPassword("M0notones")
                             }
                           })
}

async function generateTokenAsync(user: user) {
  const expire = new Date();
  expire.setUTCHours(expire.getHours() + 1);
  const expireStamp = expire.getTime();

  const token = `${ encryptPassword(user.password) }:${ expireStamp }`

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

function encryptPassword(password: string) {
  const hash = crypto.createHash("sha512");

  const data = hash.update(password);

  return data.digest("hex");
}
