import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { R6Service } from 'r6-cacher';

import { AppModule } from 'src/app.module';
import { platform, username, level, id } from './data';

describe('Level controller', () => {
  let app: INestApplication;
  let r6Service: R6Service;

  beforeEach(async () => {
    r6Service = new R6Service(null, null);

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(R6Service)
      .useValue(r6Service)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('get level', () => {
    it('should return level by id', async () => {
      jest.spyOn(r6Service, 'getLevelById').mockImplementation(async () => level);

      return request(app.getHttpServer())
        .get(`/${platform}/level/id/${id}`)
        .expect(200)
        .expect(level);
    });

    it('should return level by username', async () => {
      jest.spyOn(r6Service, 'getLevelByUsername').mockImplementation(async () => level);

      return request(app.getHttpServer())
        .get(`/${platform}/level/username/${username}`)
        .expect(200)
        .expect(level);
    });
  });
});