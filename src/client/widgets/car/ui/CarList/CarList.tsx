'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Box, SimpleGrid, Stack } from '@mantine/core';

import { IFilters } from '@/shared/interfaces';

import { Car } from '@/client/entities/car/ui';
import { useCars } from '@/client/entities/car';

import SkeletonList from './CarList.skeleton';

export const CarList = ({ filters }: { filters: IFilters }) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useCars(filters);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;

    fetchNextPage();
  }, [inView]);

  if (isLoading) return <SkeletonList />;
  if (isError) return 'Error';

  if (!data || !data.pages.length) return 'No Data';

  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {data.pages
          .filter((page) => page?.count)
          .map((item) =>
            item.rows.map(({ id, image, model, brand, price, year }) => (
              <Car
                key={id}
                id={id}
                image={image}
                model={model}
                brand={brand.name}
                price={price}
                yearManufacture={year}
              />
            ))
          )}
      </SimpleGrid>
      <Box ref={ref} />
    </Stack>
  );
};
