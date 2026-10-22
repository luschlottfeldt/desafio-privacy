import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { Creator, User } from '../src/generated/prisma/client.js';
import { createTestApp, resetDatabase, TestApp } from './utils/test-app.js';

describe('Followers (e2e)', () => {
  let testApp: TestApp;
  let creator: Creator;
  let user: User;

  const http = () => request(testApp.app.getHttpServer());
  const followersPath = (creatorId: string) =>
    `/creators/${creatorId}/followers`;

  beforeAll(async () => {
    testApp = await createTestApp();
  });

  beforeEach(async () => {
    await resetDatabase(testApp.prisma);
    creator = await testApp.prisma.creator.create({ data: { name: 'Luna' } });
    user = await testApp.prisma.user.create({ data: { name: 'Ana' } });
  });

  afterAll(async () => {
    await resetDatabase(testApp.prisma);
    await testApp.app.close();
  });

  describe('POST /creators/:creatorId/followers', () => {
    it('makes the user follow the creator', async () => {
      const response = await http()
        .post(followersPath(creator.id))
        .send({ userId: user.id })
        .expect(201);

      expect(response.body).toEqual({
        creatorId: creator.id,
        userId: user.id,
        createdAt: expect.any(String),
      });
      await expect(
        testApp.prisma.follower.count({ where: { creatorId: creator.id } }),
      ).resolves.toBe(1);
    });

    it('returns 409 when the user already follows the creator', async () => {
      await testApp.prisma.follower.create({
        data: { creatorId: creator.id, userId: user.id },
      });

      await http()
        .post(followersPath(creator.id))
        .send({ userId: user.id })
        .expect(409);
    });

    it('returns 404 when the creator does not exist', () => {
      return http()
        .post(followersPath(randomUUID()))
        .send({ userId: user.id })
        .expect(404);
    });

    it('returns 404 when the user does not exist', () => {
      return http()
        .post(followersPath(creator.id))
        .send({ userId: randomUUID() })
        .expect(404);
    });

    it('returns 400 when userId is missing or invalid', async () => {
      await http().post(followersPath(creator.id)).send({}).expect(400);
      await http()
        .post(followersPath(creator.id))
        .send({ userId: 'invalid-id' })
        .expect(400);
    });

    it('returns 400 when the creatorId is not a uuid', () => {
      return http()
        .post(followersPath('invalid-id'))
        .send({ userId: user.id })
        .expect(400);
    });
  });

  describe('DELETE /creators/:creatorId/followers/:userId', () => {
    it('makes the user unfollow the creator', async () => {
      await testApp.prisma.follower.create({
        data: { creatorId: creator.id, userId: user.id },
      });

      await http()
        .delete(`${followersPath(creator.id)}/${user.id}`)
        .expect(204);
      await expect(
        testApp.prisma.follower.count({ where: { creatorId: creator.id } }),
      ).resolves.toBe(0);
    });

    it('returns 404 when the user does not follow the creator', () => {
      return http()
        .delete(`${followersPath(creator.id)}/${user.id}`)
        .expect(404);
    });

    it('returns 400 when the userId is not a uuid', () => {
      return http()
        .delete(`${followersPath(creator.id)}/invalid-id`)
        .expect(400);
    });
  });

  describe('GET /creators/:creatorId/followers/count', () => {
    it('returns only the count when no user is informed', async () => {
      await testApp.prisma.follower.create({
        data: { creatorId: creator.id, userId: user.id },
      });

      await http()
        .get(`${followersPath(creator.id)}/count`)
        .expect(200)
        .expect({ creatorId: creator.id, count: 1 });
    });

    it('returns isFollowing true when the user follows the creator', async () => {
      await testApp.prisma.follower.create({
        data: { creatorId: creator.id, userId: user.id },
      });

      await http()
        .get(`${followersPath(creator.id)}/count`)
        .query({ userId: user.id })
        .expect(200)
        .expect({ creatorId: creator.id, count: 1, isFollowing: true });
    });

    it('returns isFollowing false when the user does not follow the creator', () => {
      return http()
        .get(`${followersPath(creator.id)}/count`)
        .query({ userId: user.id })
        .expect(200)
        .expect({ creatorId: creator.id, count: 0, isFollowing: false });
    });

    it('returns 404 when the creator does not exist', () => {
      return http()
        .get(`${followersPath(randomUUID())}/count`)
        .expect(404);
    });

    it('returns 400 when the userId is not a uuid', () => {
      return http()
        .get(`${followersPath(creator.id)}/count`)
        .query({ userId: 'invalid-id' })
        .expect(400);
    });
  });

  it('keeps the count consistent through follow and unfollow', async () => {
    const otherUser = await testApp.prisma.user.create({
      data: { name: 'Bruno' },
    });

    await http()
      .post(followersPath(creator.id))
      .send({ userId: user.id })
      .expect(201);
    await http()
      .post(followersPath(creator.id))
      .send({ userId: otherUser.id })
      .expect(201);
    await http()
      .get(`${followersPath(creator.id)}/count`)
      .expect({ creatorId: creator.id, count: 2 });

    await http()
      .delete(`${followersPath(creator.id)}/${user.id}`)
      .expect(204);
    await http()
      .get(`${followersPath(creator.id)}/count`)
      .query({ userId: user.id })
      .expect({ creatorId: creator.id, count: 1, isFollowing: false });
  });
});
