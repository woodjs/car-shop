'use client';

import {
  Accordion,
  Button,
  Grid,
  Input,
  MultiSelect,
  Select,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { useAvailableFilters } from '../model';
import { EnumSortPriceBy } from '@/client/entities/car';
import { useState } from 'react';
import { IFilters } from '@/shared/interfaces';

export const CarFilters = ({
  filters,
  setFilters,
}: {
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
}) => {
  const [tempFilters, setTempFilters] = useState(filters);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleSelectChange = (name: string, value: string | string[]) => {
    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleClick = () => {
    setFilters(tempFilters);
  };

  const { data, isLoading, isError } = useAvailableFilters();

  if (isError) return 'Error';

  return (
    <Accordion variant="contained">
      <Accordion.Item value="filter">
        <Accordion.Control>
          <Text fw="bold" fz="20px">
            Фильтры
          </Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Skeleton visible={isLoading}>
            <Stack>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Input
                    placeholder="Год от"
                    name="yearFrom"
                    value={tempFilters.yearFrom}
                    onChange={handleInputChange}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Input
                    placeholder="Год до"
                    name="yearTo"
                    value={tempFilters.yearTo}
                    onChange={handleInputChange}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Input
                    placeholder="Цена от"
                    name="priceFrom"
                    onChange={handleInputChange}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Input
                    placeholder="Цена до"
                    name="priceTo"
                    value={tempFilters.priceTo}
                    onChange={handleInputChange}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Select
                    placeholder="Сортировка по цене"
                    data={Object.values(EnumSortPriceBy).map((item) => item)}
                    value={tempFilters.sortPriceBy}
                    onChange={(e) => {
                      if (e) handleSelectChange('sortPriceBy', e);
                    }}
                  />
                </Grid.Col>
                {data?.colors && (
                  <Grid.Col>
                    <MultiSelect
                      placeholder="Цвета"
                      data={data.colors}
                      value={tempFilters.colors}
                      clearable
                      onChange={(e) => handleSelectChange('colors', e)}
                    />
                  </Grid.Col>
                )}

                {data?.configurations && (
                  <Grid.Col>
                    <MultiSelect
                      placeholder="Комплектация"
                      data={data.configurations.map((item) => item.name)}
                      value={tempFilters.configurations}
                      onChange={(e) => handleSelectChange('configurations', e)}
                      maxValues={5}
                      clearable
                    />
                  </Grid.Col>
                )}

                {data?.brands && (
                  <Grid.Col>
                    <MultiSelect
                      placeholder="Марки"
                      data={data.brands.map((item) => ({
                        label: item.name,
                        value: String(item.id),
                      }))}
                      value={tempFilters.brands}
                      onChange={(e) => handleSelectChange('brand', e)}
                      maxValues={5}
                      clearable
                    />
                  </Grid.Col>
                )}
              </Grid>
              <Button
                onClick={() => {
                  setTempFilters({
                    yearFrom: '',
                    yearTo: '',
                    priceFrom: '',
                    priceTo: '',
                    sortPriceBy: '',
                    colors: [],
                    configurations: [],
                    brands: [],
                  });
                  setFilters({
                    yearFrom: '',
                    yearTo: '',
                    priceFrom: '',
                    priceTo: '',
                    sortPriceBy: '',
                    colors: [],
                    configurations: [],
                    brands: [],
                  });
                }}
              >
                Сброс
              </Button>
              <Button onClick={handleClick}>Найти</Button>
            </Stack>
          </Skeleton>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
