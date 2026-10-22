import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { FollowersCount } from '../../components/FollowersCount/FollowersCount';
import { Layout } from '../../components/Layout/Layout';
import { StatusMessage } from '../../components/StatusMessage/StatusMessage';
import { UserSelectModal } from '../../components/UserSelectModal/UserSelectModal';
import { useCreator } from '../../hooks/useCreators';
import { useFollowers } from '../../hooks/useFollowers';
import { useUsers } from '../../hooks/useUsers';
import { isNotFoundError } from '../../utils/isNotFoundError';
import {
  ActionError,
  Actions,
  BackLink,
  Name,
  Profile,
  SwitchHint,
  UserButton,
  UserName,
} from './CreatorPage.styles';

type ModalMode = 'auto' | 'open' | 'closed';

export function CreatorPage() {
  const { creatorId = '' } = useParams<{ creatorId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalMode, setModalMode] = useState<ModalMode>('auto');

  const { state: creator } = useCreator(creatorId);
  const { state: users } = useUsers();

  const userIdParam = searchParams.get('userId');
  const selectedUser =
    users.status === 'success'
      ? users.data.find((user) => user.id === userIdParam)
      : undefined;

  const {
    state: followers,
    isSubmitting,
    actionError,
    toggleFollow,
  } = useFollowers(creatorId, selectedUser?.id, users.status !== 'loading');

  const isUserModalOpen =
    modalMode === 'open' ||
    (modalMode === 'auto' &&
      creator.status === 'success' &&
      users.status === 'success' &&
      !selectedUser);

  const selectUser = (userId: string) => {
    setSearchParams({ userId });
    setModalMode('closed');
  };

  const backSearch = selectedUser ? `?userId=${selectedUser.id}` : '';

  const topBar = (
    <>
      <BackLink to={`/${backSearch}`}>
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M12 5l-5 5 5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Criadoras
      </BackLink>
      {creator.status === 'success' &&
        (selectedUser ? (
          <UserButton
            type="button"
            aria-label={`Trocar usuário. Usuário atual: ${selectedUser.name}`}
            onClick={() => setModalMode('open')}
          >
            <Avatar name={selectedUser.name} size="sm" />
            <UserName>{selectedUser.name}</UserName>
            <SwitchHint>Trocar</SwitchHint>
          </UserButton>
        ) : (
          <Button variant="ghost" onClick={() => setModalMode('open')}>
            Escolher usuário
          </Button>
        ))}
    </>
  );

  return (
    <Layout topBar={topBar}>
      {creator.status === 'loading' && (
        <StatusMessage title="Carregando perfil..." />
      )}

      {creator.status === 'error' &&
        (isNotFoundError(creator.error) ? (
          <StatusMessage
            title="Criadora não encontrada."
            description="Confira o link ou volte para a lista de criadoras."
          />
        ) : (
          <StatusMessage
            title="Não foi possível carregar o perfil."
            description="Verifique se a API está rodando e recarregue a página."
          />
        ))}

      {creator.status === 'success' && (
        <Profile>
          <Avatar name={creator.data.name} size="lg" />
          <Name>{creator.data.name}</Name>

          {followers.status === 'loading' && (
            <StatusMessage title="Carregando seguidores..." />
          )}

          {followers.status === 'error' && (
            <StatusMessage title="Não foi possível carregar os seguidores." />
          )}

          {followers.status === 'success' && (
            <>
              <FollowersCount count={followers.data.count} />

              {selectedUser && (
                <Actions>
                  <Button
                    fullWidth
                    variant={
                      followers.data.isFollowing ? 'secondary' : 'primary'
                    }
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    onClick={toggleFollow}
                  >
                    {followers.data.isFollowing ? 'Deixar de seguir' : 'Seguir'}
                  </Button>
                  {actionError && (
                    <ActionError role="alert">{actionError}</ActionError>
                  )}
                </Actions>
              )}
            </>
          )}
        </Profile>
      )}

      <UserSelectModal
        isOpen={isUserModalOpen}
        users={users}
        selectedUserId={selectedUser?.id}
        onSelect={selectUser}
        onClose={() => setModalMode('closed')}
      />
    </Layout>
  );
}
