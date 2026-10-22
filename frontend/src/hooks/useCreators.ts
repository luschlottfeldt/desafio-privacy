import { useCallback } from 'react';
import { getCreator, getCreators } from '../services/creators.service';
import { useAsyncData } from './useAsyncData';

export function useCreators() {
  return useAsyncData(getCreators);
}

export function useCreator(creatorId: string) {
  const load = useCallback(() => getCreator(creatorId), [creatorId]);
  return useAsyncData(load);
}
