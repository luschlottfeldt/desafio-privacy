import { useCallback, useState } from 'react';
import {
  followCreator,
  getFollowersCount,
  unfollowCreator,
} from '../services/followers.service';
import { useAsyncData } from './useAsyncData';

export function useFollowers(
  creatorId: string,
  userId: string | undefined,
  enabled: boolean,
) {
  const load = useCallback(
    () => getFollowersCount(creatorId, userId),
    [creatorId, userId],
  );
  const { state, refresh } = useAsyncData(load, enabled);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const toggleFollow = useCallback(async () => {
    if (!userId || state.status !== 'success') {
      return;
    }

    setIsSubmitting(true);
    setActionError(null);

    try {
      if (state.data.isFollowing) {
        await unfollowCreator(creatorId, userId);
      } else {
        await followCreator(creatorId, userId);
      }
    } catch {
      setActionError('Não foi possível atualizar. Tente novamente.');
    } finally {
      await refresh();
      setIsSubmitting(false);
    }
  }, [creatorId, userId, state, refresh]);

  return { state, isSubmitting, actionError, toggleFollow };
}
