import type { Creator } from '../types/creator';
import { api } from './api';

export async function getCreators(): Promise<Creator[]> {
  const { data } = await api.get<Creator[]>('/creators');
  return data;
}

export async function getCreator(creatorId: string): Promise<Creator> {
  const { data } = await api.get<Creator>(`/creators/${creatorId}`);
  return data;
}
