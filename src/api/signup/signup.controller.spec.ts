import { SignupClient } from './../../infrastructure/signup/signup.client';
import { SignupService } from './../../domain/signup/signup.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { SignupAdapter } from '../../infrastructure/signup/signup.adapter';
import { SignupPort } from '../../domain/signup/signup.port';
import { SignupRepository } from '../../infrastructure/signup/signup.repository';
import { HttpModule } from '@nestjs/common';

const signup = {
  usename: 'Test News',
};

describe('AppController', () => {
  let controller: SignupController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SignupController],
      providers: [
        SignupService,
        SignupClient,
        SignupRepository,
        { provide: SignupPort, useClass: SignupAdapter },
      ],
    }).compile();

    controller = app.get<SignupController>(SignupController);
  });

  describe('root', () => {
    it('should return "saved!"', () => {
      expect(controller.create()).toBe('saved');
    });

    it('should find all', () => {
      controller.findAll().subscribe((p) => expect(p).toEqual([signup]));
    });
  });
});
