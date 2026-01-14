import bcrypt from "bcrypt";

export async function createHash(password: string): Promise<string> {
  const saltRounds = 10;

  return bcrypt.hash(password, saltRounds);
}

export async function validatePassword(
  password: string,
  encryptedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, encryptedPassword);
}
