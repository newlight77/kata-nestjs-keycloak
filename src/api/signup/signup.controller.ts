import { Controller, Get, Post } from '@nestjs/common';
import { SignupService } from '../../domain/signup/signup.service';

@Controller()
export class SignupController {

  constructor(private readonly appService: SignupService) {}

  @Post()
  create(): string {
    return this.appService.create();
  }
}
