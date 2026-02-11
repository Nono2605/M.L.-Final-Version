import nodemailer from "nodemailer";

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} must be set`);
  return v;
}

export const transporter = nodemailer.createTransport({
  host: mustEnv("SMTP_HOST"),
  port: Number(mustEnv("SMTP_PORT")), // 465
  secure: true, // true pour 465
  auth: {
    user: mustEnv("SMTP_USER"),
    pass: mustEnv("SMTP_PASS"),
  },
});
