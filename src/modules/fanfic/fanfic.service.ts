import { Injectable } from '@nestjs/common';
import { CreateFanficDto } from './dto/create-fanfic.dto';
import { UpdateFanficDto } from './dto/update-fanfic.dto';

@Injectable()
export class FanficService {
  create(createFanficDto: CreateFanficDto) {
    return 'This action adds a new fanfic';
  }

  findAll() {
    return `This action returns all fanfic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fanfic`;
  }

  update(id: number, updateFanficDto: UpdateFanficDto) {
    return `This action updates a #${id} fanfic`;
  }

  remove(id: number) {
    return `This action removes a #${id} fanfic`;
  }
}
