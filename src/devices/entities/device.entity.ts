import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity('devices')
export class Device {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  ipAddress: string;

  @Field()
  @Column()
  deviceType: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field()
  @CreateDateColumn()
  loginAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.devices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
