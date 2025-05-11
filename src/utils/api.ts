// services/api.ts
import type { ShiftPayload } from '../type';

export const getShiftData = async (id: number): Promise<ShiftPayload> => {
  const response = await fetch(`/api/shift/${id}`);
  const data = await response.json();
  return data;
};
