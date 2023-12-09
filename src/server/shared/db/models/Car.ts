import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeValidate,
  BelongsToMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Brand } from './Brand';
import { Configuration } from './Configuration';
import { CarConfiguration } from './CarConfiguration ';
import { EnumEngineType, EnumTransmissionType } from '@/shared/enums';
import { ICarCreateDB, ICarDetail } from '@/shared/interfaces';

@Table({ tableName: 'car', timestamps: false })
export class Car extends Model<ICarDetail, ICarCreateDB> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  brandId!: number;

  @Column(DataType.STRING)
  image!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model!: string;

  @Column({
    type: DataType.DECIMAL(20, 2),
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year!: number;

  @Column(DataType.STRING)
  color?: string;

  @Column(DataType.ENUM(...Object.values(EnumEngineType)))
  engineType!: EnumEngineType;

  @Column(DataType.ENUM(...Object.values(EnumTransmissionType)))
  transmission?: EnumTransmissionType;

  @Column(DataType.INTEGER)
  range?: number | null;

  @BelongsTo(() => Brand)
  brand!: Brand;

  @BelongsToMany(() => Configuration, {
    through: () => CarConfiguration,
    onDelete: 'cascade',
  })
  configurations!: Configuration[];

  @BeforeValidate
  static validateRange(car: Car) {
    if (car.engineType !== EnumEngineType.ELECTRIC) {
      car.range = null;
    }
  }
}
