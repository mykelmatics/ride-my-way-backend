export const createPassengerTable = `
CREATE TABLE IF NOT EXISTS passengers (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  password VARCHAR(250) NOT NULL,
  email VARCHAR NOT NULL
)
  `;

export const createDriverTable = `
CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  password VARCHAR(250) NOT NULL,
  email VARCHAR NOT NULL
)
  `;

export const createRideOffer = `
  CREATE TABLE IF NOT EXISTS offers (
    id SERIAL PRIMARY KEY,
    driver_id integer REFERENCES drivers(id),
    amount INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    status VARCHAR(15) NOT NULL
  )
  `;
export const createRideHistory = `
  CREATE TABLE IF NOT EXISTS ridehistory (
    id SERIAL PRIMARY KEY,
    driver_id integer REFERENCES drivers(id),
    passenger_id integer REFERENCES passengers(id),
    offer_id integer REFERENCES offers(id),
    amount INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    status VARCHAR(15) NOT NULL
  )
  `;
export const dropPassengerTable = 'DROP TABLE passengers';
export const dropDriverTable = 'DROP TABLE drivers';
export const dropRideOfferTable = 'DROP TABLE offers';
export const dropRideHistoryTable = 'DROP TABLE ridehistory';
