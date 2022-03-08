import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

class SignupModel {
  @ApiProperty({ required: true })
  @IsUUID()
  username = '';
  @ApiProperty({ required: true })
  password = '';
  @ApiProperty({ required: true })
  firstname = '';
  @ApiProperty({ required: true })
  lastname = '';
  @ApiProperty({ required: true })
  phoneNumber = '';
  status = '';
}
