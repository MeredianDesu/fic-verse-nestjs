import { PartialType } from '@nestjs/mapped-types';
import { CreateFanficDto } from './create-fanfic.dto';

export class UpdateFanficDto extends PartialType(CreateFanficDto) {}
