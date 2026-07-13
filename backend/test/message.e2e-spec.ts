// message.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Messages (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const login = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
        username: 'your-test-username',
        password: 'your-test-password',
        });

    token = login.body.access_token;
  });

    it('should send message successfully', async () => {
        const response = await request(app.getHttpServer())
        .post('/message/send')
        .set('Authorization', `Bearer ${token}`)
        .send({
        receivername: 'your-test-receivername',
        content: 'your-test-content',
        })
        .expect(200);

        expect(response.body.messageId).toBeDefined();
        expect(response.body.sender).toBeDefined();
        expect(response.body.receiver).toBe('your-test-receivername');
        expect(response.body.content).toBe('your-test-content');
        expect(response.body.createdAt).toBeDefined();
        expect(response.body.isRead).toBeDefined();
        expect(response.body.isDelivered).toBeDefined();
    });


    it('should get all messages successfully', async () => {
        const response = await request(app.getHttpServer())
        .get('/messages')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

        expect(response.body).toBeInstanceOf(Array);
        if(response.body.length){
            expect(response.body[0]).toHaveProperty("sender");
            expect(response.body[0]).toHaveProperty("receiver");
            expect(response.body[0]).toHaveProperty("content");
        }
    });

    it('should reject sending message without token', async () => {
        await request(app.getHttpServer())
            .post('/message/send')
            .send({
            receivername: 'someone',
            content: 'Hello',
            })
            .expect(401);
    });

    it('should return the newly sent message', async () => {
        const content = 'Hello from Supertest';

        await request(app.getHttpServer())
            .post('/message/send')
            .set('Authorization', `Bearer ${token}`)
            .send({
            receivername: 'your-test-receivername',
            content,
            })
            .expect(200);

        const response = await request(app.getHttpServer())
            .get('/messages')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);

        const message = response.body.find(
            (msg) =>
            msg.sender === 'your-test-username' &&
            msg.receiver === 'your-test-receivername' &&
            msg.content === content,
        );

        expect(message).toBeDefined();
    });
    
  afterEach(async () => {
    await app.close();
  });
});
