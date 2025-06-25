import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateFanficDto } from './dto/create-fanfic.dto'
import { UpdateFanficDto } from './dto/update-fanfic.dto'
import { FanficServiceInterface } from './interfaces/fanfic.service.interface'
import { Fanfic } from './entities/fanfic.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class FanficService implements FanficServiceInterface {
  constructor(
    @InjectRepository(Fanfic)
    private fanficRepository: Repository<Fanfic>,
  ) {}

  async create(createFanficDto: CreateFanficDto) {
    const isFanficExist = await this.fanficRepository.exists({ where: { title: createFanficDto.title } })

    if (isFanficExist) {
      throw new ConflictException('Fanfic already exist.')
    }

    const genre = this.fanficRepository.create(createFanficDto)

    return await this.fanficRepository.save(genre)
  }

  async findAll() {
    return await this.fanficRepository.find()
  }

  async findOne(id: number) {
    try {
      const oneFanfic = await this.fanficRepository.findOneOrFail({ where: { id: id } })

      return oneFanfic
    } catch (error) {
      throw new NotFoundException('Fanfic not found.')
    }
  }

  update(id: number, updateFanficDto: UpdateFanficDto) {
    return `This action updates a #${id} fanfic`
  }

  async remove(id: number) {
    try {
      const oneFanfic = await this.fanficRepository.findOneOrFail({ where: { id: id } })
      await this.fanficRepository.remove(oneFanfic)

      return { message: 'Fanfic removed.', statusCode: 200 }
    } catch (error) {
      throw new NotFoundException('Fanfic not found.')
    }
  }
}
