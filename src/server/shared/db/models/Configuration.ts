import {
  Table,
  Model,
  Column,
  BelongsToMany,
  AutoIncrement,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';
import { Car } from './Car';
import { CarConfiguration } from './CarConfiguration ';

@Table({ tableName: 'configuration', timestamps: false })
export class Configuration extends Model<Configuration> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column
  name!: string;

  @BelongsToMany(() => Car, () => CarConfiguration)
  cars!: Car[];
}
