const numberFormatter = new Intl.NumberFormat('pt-BR');

export function formatFollowersCount(count: number): string {
  return numberFormatter.format(count);
}

export function followersLabel(count: number): string {
  return count === 1 ? 'seguidor' : 'seguidores';
}
