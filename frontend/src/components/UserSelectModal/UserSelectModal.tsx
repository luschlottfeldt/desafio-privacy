import type { AsyncData } from '../../hooks/useAsyncData';
import type { User } from '../../types/user';
import { Avatar } from '../Avatar/Avatar';
import { Modal } from '../Modal/Modal';
import { StatusMessage } from '../StatusMessage/StatusMessage';
import { List, Name, Option } from './UserSelectModal.styles';

type UserSelectModalProps = {
  isOpen: boolean;
  users: AsyncData<User[]>;
  selectedUserId?: string;
  onSelect: (userId: string) => void;
  onClose: () => void;
};

export function UserSelectModal({
  isOpen,
  users,
  selectedUserId,
  onSelect,
  onClose,
}: UserSelectModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="Quem está navegando?"
      description="Escolha um usuário para seguir e deixar de seguir criadoras."
      onClose={onClose}
    >
      {users.status === 'loading' && (
        <StatusMessage title="Carregando usuários..." />
      )}
      {users.status === 'error' && (
        <StatusMessage
          title="Não foi possível carregar os usuários."
          description="Verifique se a API está rodando e recarregue a página."
        />
      )}
      {users.status === 'success' && (
        <List>
          {users.data.map((user) => {
            const isSelected = user.id === selectedUserId;
            return (
              <li key={user.id}>
                <Option
                  type="button"
                  aria-current={isSelected}
                  onClick={() => onSelect(user.id)}
                >
                  <Avatar name={user.name} />
                  <Name>{user.name}</Name>
                  {isSelected && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.5 9.5l3.5 3.5 7.5-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Option>
              </li>
            );
          })}
        </List>
      )}
    </Modal>
  );
}
