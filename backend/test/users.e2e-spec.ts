// users.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('User (e2e)', () => {
  let app: INestApplication<App>;

  console.log(process.cwd());
  console.log(process.env.DATABASE_URL);
  
  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  // it('should create user', async () => {
  //       const response = await request(app.getHttpServer())
  //           .post('/users')
  //           .send({
  //               username: 'your-test-username',
  //               password: 'your-test-password'
  //           })
  //           .expect(201);

  //       expect(response.body.userId).toBeDefined();    
  //       expect(response.body.username).toBe('your-test-username');    
  // })

  // it('should not create duplicate user', async () => {
  //   const user = {
  //     name: 'Test User',
  //     username: 'duplicateUser',
  //     email: 'duplicate@test.com',
  //     phoneNo: '9999999999',
  //     password: 'password123',
  //   };

  //   await request(app.getHttpServer())
  //     .post('/users')
  //     .send(user)
  //     .expect(201);

  //   const response = await request(app.getHttpServer())
  //     .post('/users')
  //     .send(user)
  //     .expect(409);

  //   expect(response.body.code).toBe('USER_ALREADY_EXISTS');
  //   expect(response.body.message).toBe('User already exists');
  // });

  beforeEach(async () => {
    console.log("1");

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    console.log("2");

    app = moduleFixture.createNestApplication();

    console.log("3");

    await app.init();

    console.log("4");
  });
  
  afterEach(async () => {
    await app.close();
  });
});
