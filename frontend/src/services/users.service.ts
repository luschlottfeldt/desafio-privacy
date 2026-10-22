import type { User } from '../types/user';
import { api } from './api';

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>('/users');
  return data;
}
