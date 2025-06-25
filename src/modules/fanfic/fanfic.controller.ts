import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { FanficService } from './fanfic.service'
import { CreateFanficDto } from './dto/create-fanfic.dto'
import { UpdateFanficDto } from './dto/update-fanfic.dto'
import { FanficControllerInterface } from './interfaces/fanfic.controller.interface'

@Controller('fanfic')
export class FanficController implements FanficControllerInterface {
  constructor(private readonly fanficService: FanficService) {}

  @Post()
  create(@Body() createFanficDto: CreateFanficDto) {
    return this.fanficService.create(createFanficDto)
  }

  @Get()
  findAll() {
    return this.fanficService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fanficService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFanficDto: UpdateFanficDto) {
    return this.fanficService.update(+id, updateFanficDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fanficService.remove(+id)
  }
}
