import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { JobRepository } from '../infrastructure/job/job.repository';
import { JobEntity } from '../infrastructure/job/job.entity';
import { toDomain } from '../core/domain/job/job.domain';
import { DBConnectionConfig } from 'src/environment/db.config';

const run = async () => {
  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {
    ...DBConnectionConfig,
    debug: true,
    ssl: false,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const jobRepository = new JobRepository(connection.getRepository(JobEntity));

  const work = _.range(1, 10)
    .map((n) =>
      toDomain({
        title: `title-seed-${seedId}-${n}`,
        address: `address-seed-${seedId}-${n}`,
        salary: n,
        currency: `currency-seed-${seedId}-${n}`,
        contract_type: `contract-type-seed-${seedId}-${n}`,
        author: `author-seed-${seedId}-${n}`,
        description: `description-seed-${seedId}-${n}`,
        created_at: new Date(),
        updated_at: new Date(),
      }),
    )
    .map((job) => jobRepository.createJob(job).then((r) => (console.log('done ->', r.title), r)));

  return await Promise.all(work);
};

run()
  .then((_) => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
