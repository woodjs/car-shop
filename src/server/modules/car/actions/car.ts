'use server';

import { ICarDetail } from '@/shared/interfaces';
import { CarService } from '..';

export const getCarByIdAction = async (id: number): Promise<ICarDetail> =>
  CarService.findById(id).then((res) => res.toJSON());
