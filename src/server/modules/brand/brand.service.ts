import { models } from '@/server/shared/db';

export const BrandService = {
  findAll() {
    return models.Brand.findAll();
  },
};
