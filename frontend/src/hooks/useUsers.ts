import { getUsers } from '../services/users.service';
import { useAsyncData } from './useAsyncData';

export function useUsers() {
  return useAsyncData(getUsers);
}
