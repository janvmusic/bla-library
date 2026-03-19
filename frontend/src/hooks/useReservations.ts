import { useState, useEffect } from 'react';
import { getReservations } from '../services/reservations-service';
import type { Reservation } from '../types/reservation';

export const useReservations = (): Reservation[] => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    getReservations().then(setReservations).catch(console.error);
  }, []);

  return reservations;
};
