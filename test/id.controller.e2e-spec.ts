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

  describe('getId', () => {
    it('should return id', async () => {
      jest.spyOn(r6Service, 'getId').mockImplementation(async () => id);

      return request(app.getHttpServer())
        .get(`/${platform}/id/${username}`)
        .expect(200)
        .expect({
          id: await r6Service.getId(platform, username),
        });
    });
  });
});