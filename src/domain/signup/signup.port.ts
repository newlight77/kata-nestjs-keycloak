import { Injectable } from '@nestjs/common';

abstract class SignupPort {
  abstract save(): string;
  abstract find(): string;
}

export {SignupPort}