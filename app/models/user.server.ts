import type {  User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function findUser(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
  user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, password: string
) {

  if(!password.length) {
    return prisma.user.create({
      data: {
        ...user
      }
    });
  }
  
  return prisma.user.create({
    data: {
      ...user,
      password: {
        create: {
          hash: await bcrypt.hash(password, 10)
        }
      }
    }
  });
}

export async function verifyLogin(
  email: User["email"],
  password: string
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
