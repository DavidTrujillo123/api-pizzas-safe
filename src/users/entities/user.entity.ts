import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Device } from '../../devices/entities/device.entity';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @HideField() // Ocultar password en GraphQL por seguridad
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleId' })
  @Field(() => Role)
  role: Role;

  @Column({ name: 'roleId', nullable: true })
  roleId: number;

  @Field(() => [Device], { nullable: 'itemsAndList' })
  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];
}
