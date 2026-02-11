import nodemailer from "nodemailer";

function getEnv(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v : undefined;
}

export function getTransporter() {
  const host = getEnv("SMTP_HOST");
  const port = getEnv("SMTP_PORT");
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");

  // Pas configuré => pas de crash
  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
}