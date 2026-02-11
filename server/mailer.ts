import nodemailer from "nodemailer";

function getEnv(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v : undefined;
}

export function getTransporter() {
  const host = getEnv("SMTP_HOST");
  const portStr = getEnv("SMTP_PORT");
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");
  if (!host || !portStr || !user || !pass) return null;

  const port = Number(portStr);
  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure, // true seulement pour 465
    auth: { user, pass },
    requireTLS: port === 587, // utile pour 587
  });
}
