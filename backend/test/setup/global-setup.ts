import { execSync } from 'node:child_process';

export default function setup(): void {
  execSync('npx prisma migrate deploy', { stdio: 'ignore' });
}
