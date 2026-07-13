// auth.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

    it('should login successfully', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
            username: 'your-test-username',
            password: 'your-test-password',
            })
            .expect(200);

        expect(response.body.statusCode).toBe(201);
        expect(response.body.message).toBe('User authentication succesful');
        expect(response.body.access_token).toBeDefined();
        expect(response.body.userId).toBeDefined();
        expect(response.body.username).toBe('your-test-username');
    });

    it('should return logged in user profile', async () => {
        const login = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
            username: 'your-test-username',
            password: 'your-test-password',
            })
            .expect(200);

        expect(login.body.access_token).toBeDefined();

        const token = login.body.access_token;

        const profile = await request(app.getHttpServer())
            .get('/auth/profile')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(profile.body.userId).toBeDefined();
        expect(profile.body.username).toBe('your-test-username');
    });

    it('should fail login with invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'wrong-user',
          password: 'wrong-password',
        })
        .expect(404); // or 401, depending on your implementation

      expect(response.body.message).toBe('User not found');
      expect(response.body.code).toBe('USER_NOT_FOUND');
    });

    it('should reject profile request without token', async () => {
      await request(app.getHttpServer())
        .get('/auth/profile')
        .expect(401);
    });

  afterEach(async () => {
    await app.close();
  });
});
