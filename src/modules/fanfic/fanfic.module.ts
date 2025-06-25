import { Module } from '@nestjs/common'
import { FanficService } from './fanfic.service'
import { FanficController } from './fanfic.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Fanfic } from './entities/fanfic.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Fanfic])],
  controllers: [FanficController],
  providers: [FanficService],
})
export class FanficModule {}
