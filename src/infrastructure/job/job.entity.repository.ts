import { EntityRepository, Repository } from 'typeorm';

import { JobEntity } from './job.entity';

@EntityRepository(JobEntity)
export class JobEntityRepository extends Repository<JobEntity> {
  public async findById(productId: number): Promise<JobEntity> {
    return await this.findOne(productId);
  }

  public async findAll(): Promise<JobEntity[]> {
    return await this.find({});
  }
  public async createProduct(entity: JobEntity): Promise<JobEntity> {
    await this.save(entity);
    return entity;
  }

  public async editProduct(
    jobId: number,
    entity: JobEntity,
  ): Promise<JobEntity> {
    let product = await this.findOne(jobId);
    product = { ...product, ...entity };
    await this.save(product);
    return product;
  }

  public async destroy(jobId: number): Promise<void> {
    const product = await this.findOne(jobId);
    await this.remove(product);
  }
}
