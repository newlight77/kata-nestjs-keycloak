import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { JobDomain } from '../../domain/job/job.domain';

export class JobModel {
  @ApiProperty({ required: true })
  @IsUUID()
  private _id: string;
  @ApiProperty({ required: true })
  @IsString()
  private _title: string;
  @ApiProperty({ required: true })
  @IsString()
  private _address: string;
  private _salary: string;
  @IsString()
  @ApiProperty({ required: true })
  private _contract_type: string;
  private _description: string;
  @ApiProperty({ required: true })
  @IsString()
  private _author: string;
  @ApiProperty({ required: true })
  @IsString()
  private _created_at: Date;
  private _updated_at: Date;

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
    this._title = title;
    this._address = address;
    this._salary = salary;
    this._contract_type = contract_type;
    this._author = author;
    this._created_at = new Date();
    this._updated_at = new Date();
    this._description = description;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  public get address(): string {
    return this._address;
  }
  public set address(value: string) {
    this._address = value;
  }

  public get salary(): string {
    return this._salary;
  }
  public set salary(value: string) {
    this._salary = value;
  }

  public get contract_type(): string {
    return this._contract_type;
  }
  public set contract_type(value: string) {
    this._contract_type = value;
  }

  public get author(): string {
    return this._author;
  }
  public set author(value: string) {
    this._author = value;
  }

  public get created_at(): Date {
    return this._created_at;
  }
  public set created_at(value: Date) {
    this._created_at = value;
  }

  public get updated_at(): Date {
    return this._updated_at;
  }
  public set updated_at(value: Date) {
    this._updated_at = value;
  }

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
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
    title: model.title,
    address: model.address,
    salary: model.salary,
    contract_type: model.contract_type,
    author: model.author,
    description: model.description,
  });
};
