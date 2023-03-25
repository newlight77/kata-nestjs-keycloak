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
  company: string;
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
    company,
    address,
    salary,
    description,
  }: {
    id: string;
    title: string;
    company: string;
    address: string;
    salary: number;
    description: string;
  }) {
    this.id = id;
    this.title = title;
    this.company = company;
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
    company: domain.company,
    address: domain.address,
    salary: domain.salary,
    description: domain.description,
  });
};

export const toDomain = (model: JobModel): JobDomain => {
  return new JobDomain({
    id: model.id,
    title: model.title,
    company: model.company,
    address: model.address,
    salary: model.salary,
    description: model.description,
    created_at: model.created_at,
    updated_at: model.updated_at,
  });
};
