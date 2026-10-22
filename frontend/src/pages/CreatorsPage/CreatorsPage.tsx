import { useSearchParams } from 'react-router';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { Layout } from '../../components/Layout/Layout';
import { StatusMessage } from '../../components/StatusMessage/StatusMessage';
import { useCreators } from '../../hooks/useCreators';
import {
  CreatorLink,
  Item,
  List,
  Name,
  Subtitle,
  Title,
} from './CreatorsPage.styles';

export function CreatorsPage() {
  const { state: creators, refresh } = useCreators();
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <Layout>
      <Title>Criadoras</Title>
      <Subtitle>Escolha uma criadora para ver o perfil.</Subtitle>

      {creators.status === 'loading' && (
        <StatusMessage title="Carregando criadoras..." />
      )}

      {creators.status === 'error' && (
        <StatusMessage
          title="Não foi possível carregar as criadoras."
          description="Verifique se a API está rodando e tente novamente."
          action={
            <Button variant="secondary" onClick={refresh}>
              Tentar novamente
            </Button>
          }
        />
      )}

      {creators.status === 'success' && creators.data.length === 0 && (
        <StatusMessage
          title="Nenhuma criadora cadastrada."
          description="Rode o seed do backend para criar a primeira."
        />
      )}

      {creators.status === 'success' && creators.data.length > 0 && (
        <List>
          {creators.data.map((creator) => (
            <Item key={creator.id}>
              <CreatorLink to={{ pathname: `/creators/${creator.id}`, search }}>
                <Avatar name={creator.name} />
                <Name>{creator.name}</Name>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    d="M8 5l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CreatorLink>
            </Item>
          ))}
        </List>
      )}
    </Layout>
  );
}
