import { SignupService } from './../../domain/signup/signup.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { SignupAdapter } from '../../infrastructure/signup/signup.adapter';
import { SignupPort } from '../../domain/signup/signup.port';

describe('AppController', () => {
  let controller: SignupController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SignupController],
      providers: [
        SignupService,
        { provide : SignupPort, useClass: SignupAdapter}
      ],
    }).compile();

    controller = app.get<SignupController>(SignupController);
  });

  describe('root', () => {
    it('should return "sve!"', () => {
      expect(controller.create()).toBe('saved');
    });
  });
});
