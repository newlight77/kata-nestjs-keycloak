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
  @IsString()
  currency: string;
  @IsString()
  @ApiProperty({ required: true })
  contract_type: string;
  @ApiProperty({ required: true })
  @IsString()
  description: string;
  @ApiProperty({ required: true })
  @IsString()
  author: string;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    title,
    address,
    salary,
    currency,
    contract_type,
    author,
    description,
  }: {
    id: string;
    title: string;
    address: string;
    salary: number;
    currency: string;
    contract_type: string;
    author: string;
    description: string;
  }) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.currency = currency;
    this.contract_type = contract_type;
    this.author = author;
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
    currency: domain.currency,
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
    currency: model.currency,
    contract_type: model.contract_type,
    author: model.author,
    description: model.description,
  });
};
