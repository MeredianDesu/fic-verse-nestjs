import { IsOptional } from 'class-validator'
import { Fanfic } from 'src/modules/fanfic/entities/fanfic.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  name: string

  @Column()
  @IsOptional()
  avatar: string

  @Column({ name: 'cover_url' })
  @IsOptional()
  coverUrl: string

  @Column()
  @IsOptional()
  about: string

  @Column({ name: 'tariff_plan' })
  @IsOptional()
  tariffPlan: string

  @Column({ name: 'referral_code', default: null })
  referralCode: string

  @Column({ name: 'referral_count', default: 0 })
  referralCount: number

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean

  @Column()
  @IsOptional()
  role: string

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date

  @OneToMany(() => Fanfic, (fanfic) => fanfic.author)
  fanfics: Fanfic[]
}
