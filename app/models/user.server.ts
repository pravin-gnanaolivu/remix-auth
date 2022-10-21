import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function findUser(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
  user: Pick<User, "firstName" | "lastName" | "password" | "email">
) {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: { ...user, password: hashedPassword },
  });
}

export async function verifyLogin(
  email: User["email"],
  password: User["password"]
) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return null;
  }

  //TODO: Remove password prop from the user later
  // const { password: _password, ...userWithoutPassword } = user;

  return user;
}
