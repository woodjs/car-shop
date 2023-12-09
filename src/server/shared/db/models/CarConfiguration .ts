import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
} from 'sequelize-typescript';
import { Car } from './Car';
import { Configuration } from './Configuration';

interface ICreate {
  carId: number;
  configurationId: number;
}

@Table({ tableName: 'car_configuration', timestamps: false })
export class CarConfiguration extends Model<CarConfiguration, ICreate> {
  @ForeignKey(() => Car)
  @Column({ type: DataType.INTEGER, allowNull: false })
  carId!: number;

  @ForeignKey(() => Configuration)
  @Column({ type: DataType.INTEGER, allowNull: false })
  configurationId!: number;
}
