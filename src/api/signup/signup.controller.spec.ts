import { SignupClient } from './../../infrastructure/signup/signup.client';
import { SignupService } from './../../domain/signup/signup.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { SignupAdapter } from '../../infrastructure/signup/signup.adapter';
import { SignupPort } from '../../domain/signup/signup.port';
import { SignupRepository } from '../../infrastructure/signup/signup.repository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigModule } from '@nestjs/config';
import coreConfig from '../../environment/core.config';
import { error } from 'console';
import { of } from 'rxjs';

const signup = {
  usename: 'Test News',
};

const signups = [{ usename: 'Test News' }];
const response = {
  data: signups,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

describe('SignupController', () => {
  let controller: SignupController;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forFeature(coreConfig)],
      controllers: [SignupController],
      providers: [
        SignupService,
        SignupClient,
        SignupRepository,
        { provide: SignupPort, useClass: SignupAdapter },
      ],
    }).compile();

    controller = module.get<SignupController>(SignupController);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('signup', () => {
    it('should return "saved!"', () => {
      expect(controller.create()).toBe('saved');
    });

    it('should find all', () => {
      jest.spyOn(httpService, 'get').mockReturnValue(of(response));

      //controller.findAll().then((p) => expect(p).toEqual([signup]));

      // controller.findAll().then(
      //   (data) => expect(data).toEqual(signups),
      //   (err) => {
      //     console.log(err);
      //     throw error;
      //   },
      // );
    });
  });
});
