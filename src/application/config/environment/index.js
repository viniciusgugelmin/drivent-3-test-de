import dotenv from "dotenv";

dotenv.config();

const environment = {
  API_PORT: +process.env.API_PORT || 3333,
  DOMAIN: process.env.DOMAIN || `http://localhost:${process.env.API_PORT}`,
  DRIVENT_DOMAIN: process.env.DRIVENT_DOMAIN || "http://localhost:4000",
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL
};

if (Object.values(environment).includes(undefined)) {
  const missingVaribles = Object.keys(environment)
    .filter((key) => environment[key] === undefined)
    .join(", ");

  throw new Error(`Missing environment variables: ${missingVaribles}`);
}

for (const key in environment) {
  if (typeof environment[key] !== "string") continue;

  environment[key] = environment[key].replace(/^'(.*)'$/, "$1");
}

export { environment };
