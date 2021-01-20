import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from 'src/app.module';
import { PlatformType } from 'src/models/platform-type';
import { R6Service } from 'src/services/r6.service';

describe('Id controller', () => {
  let app: INestApplication;
  let r6Service: R6Service;

  const platform = PlatformType.Uplay;
  const username = 'Godly';
  const id = 'be3313d6-d443-4eae-818f-bb7f56837781';
  const result = {
    "id": "be3313d6-d443-4eae-818f-bb7f56837781",
    "level": 377,
    "xp": 137702,
    "lootboxProbability": {
      "raw": 4320,
      "percent": "43.20%"
    }
  };

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

  describe('get rank', () => {
    it('should return level by id', async () => {
      jest.spyOn(r6Service, 'getLevelById').mockImplementation(async () => result);

      return request(app.getHttpServer())
        .get(`/${platform}/level/id/${id}`)
        .expect(200)
        .expect(result);
    });

    it('should return level by username', async () => {
      jest.spyOn(r6Service, 'getLevelByUsername').mockImplementation(async () => result);

      return request(app.getHttpServer())
        .get(`/${platform}/level/username/${username}`)
        .expect(200)
        .expect(result);
    });
  });
});