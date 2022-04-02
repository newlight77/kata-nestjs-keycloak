import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { JobDomain } from '../../core/domain/job/job.domain';

export class JobModel {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
  @ApiProperty({ required: true })
  @IsString()
  title: string;
  @ApiProperty({ required: true })
  @IsString()
  address: string;
  salary: number;
  @ApiProperty({ required: true })
  @IsString()
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    title,
    address,
    salary,
    description,
  }: {
    id: string;
    title: string;
    address: string;
    salary: number;
    description: string;
  }) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.description = description;
  }
}

export const fromDomain = (domain: JobDomain): JobModel => {
  return new JobModel({
    id: domain.id,
    title: domain.title,
    address: domain.address,
    salary: domain.salary,
    description: domain.description,
  });
};

export const toDomain = (model: JobModel): JobDomain => {
  return new JobDomain({
    id: model.id,
    title: model.title,
    address: model.address,
    salary: model.salary,
    description: model.description,
  });
};
