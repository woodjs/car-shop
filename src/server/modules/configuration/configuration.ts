import { models } from '@/server/shared/db';

export const ConfigurationService = {
  findAll() {
    return models.Configuration.findAll();
  },
};
