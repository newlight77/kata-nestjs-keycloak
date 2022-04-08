import { JobDomain } from '../../core/domain/job/job.domain';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'job_offer' })
export class JobEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'company' })
  company!: string;

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
  entity.company = domain.company;
  entity.address = domain.address;
  entity.salary = domain.salary;
  entity.description = domain.description;
  entity.created_at = domain.created_at;
  entity.updated_at = domain.updated_at;
  return entity;
};

export const toDomain = (entity: JobEntity): JobDomain => {
  return new JobDomain({
    id: entity.id,
    title: entity.title,
    company: entity.company,
    address: entity.address,
    salary: entity.salary,
    description: entity.description,
    created_at: entity.created_at,
    updated_at: entity.updated_at,
  });
};
