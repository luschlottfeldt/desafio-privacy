import type { Follower, FollowersCount } from '../types/followers';
import { api } from './api';

export async function getFollowersCount(
  creatorId: string,
  userId?: string,
): Promise<FollowersCount> {
  const { data } = await api.get<FollowersCount>(
    `/creators/${creatorId}/followers/count`,
    { params: { userId } },
  );
  return data;
}

export async function followCreator(
  creatorId: string,
  userId: string,
): Promise<Follower> {
  const { data } = await api.post<Follower>(
    `/creators/${creatorId}/followers`,
    { userId },
  );
  return data;
}

export async function unfollowCreator(
  creatorId: string,
  userId: string,
): Promise<void> {
  await api.delete(`/creators/${creatorId}/followers/${userId}`);
}
