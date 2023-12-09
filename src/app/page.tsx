'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Stack } from '@mantine/core';

// import { IFilters } from '@/client/entities/car';
import { IFilters } from '@/shared/interfaces';
import { CarList } from '@/client/widgets/car';
import { CarFilters } from '@/client/features/car';

export default function Home() {
  const [filters, setFilters] = useState<IFilters>({
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: '',
    sortPriceBy: '',
    colors: [],
    configurations: [],
    brands: [],
  });

  return (
    <Stack w="full">
      <CarFilters filters={filters} setFilters={setFilters} />
      <Link href="/car/create">
        <Button>Добавить</Button>
      </Link>
      <CarList filters={filters} />
    </Stack>
  );
}
