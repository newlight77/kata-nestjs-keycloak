import { JobDomain } from '../../core/domain/job/job.domain';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'job_offer' })
export class JobEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: string;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'address' })
  address!: string;

  @Column({ name: 'salary' })
  salary!: number;

  @Column({ name: 'description' })
  description!: string;

  @Column({ name: 'created_at' })
  created_at!: Date;

  @Column({ name: 'updated_at' })
  updated_at!: Date;
}

export const fromDomain = (domain: JobDomain): JobEntity => {
  const entity = new JobEntity();
  entity.id = domain.id;
  entity.title = domain.title;
  entity.address = domain.address;
  entity.salary = domain.salary;
  entity.description = domain.description;
  return entity;
};

export const toDomain = (entity: JobEntity): JobDomain => {
  return new JobDomain({
    id: entity.id,
    title: entity.title,
    address: entity.address,
    salary: entity.salary,
    description: entity.description,
  });
};
