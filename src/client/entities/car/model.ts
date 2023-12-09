import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { baseAPI } from '@/client/shared/api';

import { JSONToQueryParams } from '@/client/shared/lib';
import {
  ICarBase,
  ICarCreate,
  ICarDetail,
  ICarUpdate,
  IFilters,
} from '@/shared/interfaces';
import { toast } from 'react-toastify';

export enum EnumSortPriceBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface IApiData {
  count: number;
  rows: ICarBase[];
}

const LIMIT = 10;

export const useCars = (filters: IFilters) =>
  useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam = 1 }) =>
      baseAPI.get<IApiData, IApiData>(
        `/cars${JSONToQueryParams({
          ...filters,
          page: pageParam,
          limit: LIMIT,
        })}`
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log(lastPage, allPages, lastPageParam, allPageParams);
      const maxPages = Math.ceil(lastPage.count / LIMIT);
      const nextPage = allPages.length + 1;

      if (maxPages <= allPages.length) return null;

      return nextPage <= maxPages ? nextPage : null;
    },
  });

export const useCarById = (id: number) =>
  useQuery<ICarDetail>({
    queryKey: ['car'],
    queryFn: () => baseAPI.get(`/cars/${id}`),
  });

export const useCarCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['car-create'],
    mutationFn: (payload: ICarCreate) => baseAPI.post('/cars', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      toast.success('ВЫ успешно добавили машину');
    },
    onError: () => toast.error('Не удалось добавить машину'),
  });
};

export const useCarUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['car-update'],
    mutationFn: (payload: ICarUpdate) =>
      baseAPI.put(`/cars/${payload.id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      toast.success('Вы успешно обновили машину');
    },
    onError: () => toast.error('Не удалось обновить машину'),
  });
};
