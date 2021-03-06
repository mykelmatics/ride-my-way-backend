import { pool } from '../models/pool';
import {
  dropPassengerTable,
  dropRideOfferTable,
  dropDriverTable,
  createPassengerTable,
  createRideOffer,
  createDriverTable,
  createRideHistory,
  dropRideHistoryTable,
} from './queries';

export const executeQueryArray = async (arr) =>
  new Promise((resolve) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });

export const dropTables = () =>
  executeQueryArray([
    dropRideOfferTable,
    dropPassengerTable,
    dropDriverTable,
    dropRideHistoryTable,
  ]);
export const createTables = () =>
  executeQueryArray([
    createPassengerTable,
    createDriverTable,
    createRideHistory,
    createRideOffer
    
  ]);
