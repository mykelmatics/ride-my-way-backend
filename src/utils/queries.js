export const createPassengerTable = `
CREATE TABLE IF NOT EXISTS passenger (
  id SERIAL PRIMARY KEY,
  "firstName" VARCHAR NOT NULL,
  "lastName" VARCHAR NOT NULL,
  "phoneNumber" VARCHAR NOT NULL,
  password VARCHAR(250) NOT NULL,
  email VARCHAR NOT NULL
)
  `;

export const createDriverTable = `
CREATE TABLE IF NOT EXISTS driver (
  id SERIAL PRIMARY KEY,
  "firstName" VARCHAR NOT NULL,
  "lastName" VARCHAR NOT NULL,
  "phoneNumber" VARCHAR NOT NULL,
  password VARCHAR(250) NOT NULL,
  email VARCHAR NOT NULL
)
  `;

export const createRideOffer = `
  CREATE TABLE IF NOT EXISTS rideoffer (
    id SERIAL PRIMARY KEY,
    "driverId" integer REFERENCES driver(id),
    amount INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    status VARCHAR(15) NOT NULL
  )
  `;
export const createRideHistory = `
  CREATE TABLE IF NOT EXISTS ridehistory (
    id SERIAL PRIMARY KEY,
    "driverId" integer REFERENCES driver(id),
    "passengerId" integer REFERENCES passenger(id),
    "offerId" integer REFERENCES rideoffer(id),
    amount INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    status VARCHAR(15) NOT NULL
  )
  `;
export const dropPassengerTable = 'DROP TABLE passenger';
export const dropDriverTable = 'DROP TABLE driver';
export const dropRideOfferTable = 'DROP TABLE rideoffer';
export const dropRideHistoryTable = 'DROP TABLE ridehistory';
