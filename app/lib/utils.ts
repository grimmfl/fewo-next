import { PrismaClient } from "@prisma/client";

export function mapInvoiceType(type: number) {
  return type === 0
    ? ""
    : type === 1
      ? "Standard"
      : type === 2
        ? "Booking"
        : "AirBnb";
}


export function ValueOrNull(value: string) {
  return value == "" ? null : value;
}

export function setLocalStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export function getLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }

  return null;
}

export function removeLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}

export async function checkTokenAsync(token: string | null, prisma: PrismaClient) {
  if (token == null || token === "") return false;

  const timestamp = parseInt(token.split(":")[1], 10);

  if (timestamp < Date.now()) return false;

  const user = await prisma
    .user
    .findFirst({
      where: { token: token },
               });

  return user != null;
}

