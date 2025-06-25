import { CreateFanficDto } from '../dto/create-fanfic.dto'
import { UpdateFanficDto } from '../dto/update-fanfic.dto'
import { Fanfic } from '../entities/fanfic.entity'

export interface FanficControllerInterface {
  create(createFanficDto: CreateFanficDto): Promise<Fanfic>
  findAll(): Promise<Fanfic[]>
  findOne(id: string): Promise<Fanfic>
  update(id: string, updateFanficDto: UpdateFanficDto): string
  remove(id: string): Promise<Object>
}
