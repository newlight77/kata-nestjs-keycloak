import { Given, Then, When } from '@cucumber/cucumber';
import { After, Before } from '@cucumber/cucumber';
import { ConfigModule } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { expect } from 'chai';

import { JobComponentModule } from '../../../src/modules/job.component.module';

import backendConfig from '../../../src/environment/backend.config';
import { TestDatabaseModule } from '../../modules/test.database.module';
import { getConnection } from 'typeorm';

Before(async function () {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [backendConfig],
      }),
      TestDatabaseModule,
      JobComponentModule,
    ],
  }).compile();

  this.app = moduleFixture.createNestApplication();
  await this.app.init();
});

After(async function () {
  this.dbConnect = getConnection('test-default');
  const entities = this.dbConnect.entityMetadatas;

  for (const entity of entities) {
    const repository = this.dbConnect.getRepository(entity.name);
    await repository.clear();
  }

  this.dbConnect.close();
});

Given('a user job with details as shown in the table', function (dataTable) {
  this.job = dataTable.rowsHash();
});

When('the user posts the job', async function () {
  await request(this.app.getHttpServer())
    .post('/jobs')
    .send(this.job)
    .expect(HttpStatus.CREATED)
    .then((res) => {
      this.result = res.body;
    });
});

Then('The job is created as shown in the table', function (dataTable) {
  this.expectedJob = dataTable.rowsHash();
  expect(this.result.job.title).to.eql(this.expectedJob.title);
  expect(this.result.job.company).to.eql(this.expectedJob.company);
  expect(this.result.job.salary).to.eql(this.expectedJob.salary);
  expect(this.result.job.description).to.eql(this.expectedJob.description);
});

Then('a message <message> is shown', function (dataTable) {
  const expectedMessage = dataTable.rowsHash()['message'];
  const message = this.result['message'];
  expect(message).to.eql(expectedMessage);
});
