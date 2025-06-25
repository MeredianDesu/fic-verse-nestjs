import { CreateFanficDto } from '../dto/create-fanfic.dto'
import { UpdateFanficDto } from '../dto/update-fanfic.dto'
import { Fanfic } from '../entities/fanfic.entity'

export interface FanficServiceInterface {
  create(createFanficDto: CreateFanficDto): Promise<Fanfic>
  findAll(): Promise<Fanfic[]>
  findOne(id: number): Promise<Fanfic>
  update(id: number, updateFanficDto: UpdateFanficDto): string
  remove(id: number): Promise<Object>
}
