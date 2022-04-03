import { Given, Then, When } from '@cucumber/cucumber';
import { After, Before } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../src/app.module';

Before(async function () {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  this.app = moduleFixture.createNestApplication();

  await this.app.init();
});

After(function () {
  // This hook will be executed before scenarios tagged with @foo
});

Given('Writing a job with {string}', function (description: string) {
  this.payload = { description: description };
});

When('I submit the job', async function () {
  this.jobResponse = request(this.app.getHttpServer()).post('/job').send(this.payload);
});

Then('I received a {string} message', function (message: string) {
  this.jobResponse.end((err, res) => {
    //expect(res.text).to.equals(message);
  });
});
