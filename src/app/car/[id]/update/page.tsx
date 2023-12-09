'use client';

import { useCarById, useCarUpdate } from '@/client/entities/car';
import { useAvailableFilters } from '@/client/features/car';
// import { updateCarAction } from '@/server/modules/car/actions/update';

import { EnumEngineType, EnumTransmissionType } from '@/shared/enums';

import {
  Box,
  Breadcrumbs,
  Button,
  ColorInput,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IFormValues {
  brandId: string | null;
  image: string;
  model: string;
  price: string | number;
  year: string | number;
  color?: string;
  engineType: string;
  transmission?: string | null;
  range?: number | null;
  configurations: string[];
}

export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const [oldData, setOldData] = useState({});

  const { data, isLoading, isError } = useCarById(id);
  const { mutate } = useCarUpdate();

  const {
    data: filters,
    isLoading: isLoadingFilters,
    isError: isErrorFilters,
  } = useAvailableFilters();

  const form = useForm<IFormValues>({
    initialValues: {
      brandId: null,
      image: '',
      model: '',
      price: '',
      year: '',
      color: '',
      engineType: null || '',
      transmission: null,
      range: null,
      configurations: [],
    },

    validate: {
      brandId: (value) => (!value ? 'Заполните поле' : null),
      image: (value) => (!value.length ? 'Заполните поле' : null),
      model: (value) => (!value.length ? 'Заполните поле' : null),
      price: (value) => (!value ? 'Заполните поле' : null),
      year: (value) => {
        if (!value) return 'Заполните поле';
        if (new Date().getFullYear() < Number(value)) return 'Некорректный год';
      },
      color: (value) => (!value || !value.length ? 'Заполните поле' : null),
      engineType: (value) => (!value ? 'Заполните поле' : null),
      transmission: (value, values) => {
        if (values.engineType === EnumEngineType.PETROL && !value)
          return 'Заполните поле';
      },
    },
  });

  useEffect(() => {
    if (!data) return;

    setOldData({
      brandId: String(data.brand.id),
      image: data.image,
      model: data.model,
      price: data.price,
      year: data.year,
      color: data.color || '',
      engineType: data.engineType,
      transmission: data.transmission,
      range: data.range || null,
      configurations: data.configurations.map((item) => String(item.id)),
    });

    form.setValues({
      brandId: String(data.brand.id),
      image: data.image,
      model: data.model,
      price: data.price,
      year: data.year,
      color: data.color || '',
      engineType: data.engineType,
      transmission: data.transmission,
      range: data.range || null,
      configurations: data.configurations.map((item) => String(item.id)),
    });
  }, [data]);

  console.log(form.values);

  if (isLoading || isLoadingFilters) return 'Loading';
  if (isError || isErrorFilters) return 'Error';
  return (
    <Stack mx="auto" maw={340} justify="center">
      <Breadcrumbs>
        <Breadcrumbs>
          <Link href="/">Машины</Link>
          <Link href={`/car/${id}`}>{id}</Link>
          <Text>Update</Text>
        </Breadcrumbs>
      </Breadcrumbs>
      <Box>
        <form
          onSubmit={form.onSubmit(async (values) => {
            mutate({
              ...values,
              brandId: Number(values.brandId),
              price: Number(values.price),
              year: Number(values.year),
              configurations: values.configurations.map((item: string) =>
                Number(item)
              ),
              id,
            });
            setOldData(form.values);
          })}
        >
          <Stack>
            <Select
              label="Марка"
              data={filters?.brands.map((item) => ({
                label: item.name,
                value: String(item.id),
              }))}
              {...form.getInputProps('brandId')}
            />
            <TextInput label="Изображение" {...form.getInputProps('image')} />
            <TextInput label="Модель" {...form.getInputProps('model')} />
            <NumberInput label="Цена" {...form.getInputProps('price')} />
            <NumberInput
              label="Год производства"
              {...form.getInputProps('year')}
            />
            <ColorInput label="Цвет" {...form.getInputProps('color')} />
            <Select
              label="Тип двигателя"
              data={Object.values(EnumEngineType).map((item) => item)}
              {...form.getInputProps('engineType')}
              onChange={(value) => {
                if (EnumEngineType.PETROL !== value) {
                  form.setFieldValue('transmission', null);
                }

                form.getInputProps('engineType').onChange(value);
              }}
            />
            <NumberInput
              label="Запас хода в (км)"
              disabled={
                EnumEngineType.ELECTRIC !==
                form.getInputProps('engineType').value
              }
              {...form.getInputProps('range')}
            />
            <Select
              label="Трансмиссия"
              data={Object.values(EnumTransmissionType).map((item) => item)}
              disabled={
                EnumEngineType.PETROL !== form.getInputProps('engineType').value
              }
              {...form.getInputProps('transmission')}
              value={form.values.transmission}
            />

            <MultiSelect
              label="Комплектация"
              data={filters?.configurations.map((item) => ({
                label: item.name,
                value: String(item.id),
              }))}
              {...form.getInputProps('configurations')}
            />

            <Button
              onClick={() => form.setValues(oldData)}
              disabled={JSON.stringify(oldData) === JSON.stringify(form.values)}
            >
              Сбросить
            </Button>
            <Button
              type="submit"
              disabled={JSON.stringify(oldData) === JSON.stringify(form.values)}
            >
              Обновить
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
