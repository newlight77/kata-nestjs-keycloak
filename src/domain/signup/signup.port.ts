import { Injectable } from '@nestjs/common';

abstract class SignupPort {
  abstract save(): string;
}

export {SignupPort}