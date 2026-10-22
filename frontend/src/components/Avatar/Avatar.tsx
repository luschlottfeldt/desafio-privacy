import { getInitials } from '../../utils/getInitials';
import { type AvatarSize, Monogram } from './Avatar.styles';

type AvatarProps = {
  name: string;
  size?: AvatarSize;
};

export function Avatar({ name, size = 'md' }: AvatarProps) {
  return (
    <Monogram $size={size} aria-hidden="true">
      {getInitials(name)}
    </Monogram>
  );
}
