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
  salary: string;
  @IsString()
  @ApiProperty({ required: true })
  contract_type: string;
  description: string;
  @ApiProperty({ required: true })
  @IsString()
  author: string;
  @ApiProperty({ required: true })
  @IsString()
  created_at: Date;
  updated_at: Date;

  constructor({
    title,
    address,
    salary,
    contract_type,
    author,
    description,
  }: {
    title: string;
    address: string;
    salary: string;
    contract_type: string;
    author: string;
    description: string;
  }) {
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.contract_type = contract_type;
    this.author = author;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.description = description;
  }
}

export const fromDomain = (domain: JobDomain): JobModel => {
  return new JobModel({
    title: domain.title,
    address: domain.address,
    salary: domain.salary,
    contract_type: domain.contract_type,
    author: domain.author,
    description: domain.description,
  });
};

export const toDomain = (model: JobModel): JobDomain => {
  return new JobDomain({
    id: model.id,
    title: model.title,
    address: model.address,
    salary: model.salary,
    contract_type: model.contract_type,
    author: model.author,
    description: model.description,
  });
};
