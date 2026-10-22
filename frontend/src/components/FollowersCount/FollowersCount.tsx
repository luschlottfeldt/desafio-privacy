import {
  followersLabel,
  formatFollowersCount,
} from '../../utils/formatFollowers';
import { Label, Value, Wrapper } from './FollowersCount.styles';

type FollowersCountProps = {
  count: number;
};

export function FollowersCount({ count }: FollowersCountProps) {
  return (
    <Wrapper aria-live="polite">
      <Value key={count}>{formatFollowersCount(count)}</Value>
      <Label>{followersLabel(count)}</Label>
    </Wrapper>
  );
}
