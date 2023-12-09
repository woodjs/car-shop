import { useQuery } from '@tanstack/react-query';
import { baseAPI } from '@/client/shared/api';

import { IConfiguration } from '@/shared/interfaces';

interface IAvailableFilters {
  configurations: IConfiguration[];
  colors: string[];
  brands: {
    id: number;
    name: string;
  }[];
}

export const useAvailableFilters = () =>
  useQuery<IAvailableFilters>({
    queryKey: ['available-filters'],
    queryFn: () => baseAPI.get('/cars/filters'),
  });
