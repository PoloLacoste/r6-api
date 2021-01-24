import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { R6Service } from 'r6-api-caching';

import { AppModule } from 'src/app.module';
import { platform, username, playtime, id } from './data';

describe('Playtime controller', () => {
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

  describe('get Playtime', () => {
    it('should return Playtime by id', async () => {
      jest.spyOn(r6Service, 'getPlaytimeById').mockImplementation(async () => playtime);

      return request(app.getHttpServer())
        .get(`/${platform}/playtime/id/${id}`)
        .expect(200)
        .expect(playtime);
    });

    it('should return Playtime by username', async () => {
      jest.spyOn(r6Service, 'getPlaytimeByUsername').mockImplementation(async () => playtime);

      return request(app.getHttpServer())
        .get(`/${platform}/playtime/username/${username}`)
        .expect(200)
        .expect(playtime);
    });
  });
});