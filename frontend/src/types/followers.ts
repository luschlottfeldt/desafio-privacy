export type FollowersCount = {
  creatorId: string;
  count: number;
  isFollowing?: boolean;
};

export type Follower = {
  creatorId: string;
  userId: string;
  createdAt: string;
};
