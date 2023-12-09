'use client';

import Link from 'next/link';

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
import { useAvailableFilters } from '@/client/features/car';
import { useCarCreate } from '@/client/entities/car';
// import { createCarAction } from '@/server/modules/car/actions/create';

interface IFormValues {
  brandId: string | null;
  image: string;
  model: string;
  price: string | number;
  year: string | number;
  color: string;
  engineType: string;
  transmissions: string | null;
  range?: string | null;
  configurations: string[] | number[];
}

export default function Page() {
  const { data, isLoading, isError } = useAvailableFilters();
  const { mutate } = useCarCreate();
  const form = useForm<IFormValues>({
    initialValues: {
      brandId: null,
      image: '',
      model: '',
      price: '',
      year: '',
      color: '',
      engineType: null || '',
      transmissions: null,
      range: '',
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
      color: (value) => (!value.length ? 'Заполните поле' : null),
      engineType: (value) => (!value ? 'Заполните поле' : null),
      transmissions: (value, values) => {
        if (values.engineType === EnumEngineType.PETROL && !value)
          return 'Заполните поле';
      },
    },
  });

  if (isError) return 'Error';

  return (
    <Stack mx="auto" maw={340} justify="center">
      <Breadcrumbs>
        <Breadcrumbs>
          <Link href="/">Машины</Link>
          <Text>Create</Text>
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
              configurations: values.configurations.map((item) => Number(item)),
              range: values.range ? Number(values.range) : null,
            });
            form.reset();
          })}
        >
          <Stack>
            <Select
              label="Марка"
              data={data?.brands.map((item) => ({
                label: item.name,
                value: String(item.id),
              }))}
              disabled={isLoading}
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
                  form.setFieldValue('transmissions', null);
                }

                if (EnumEngineType.ELECTRIC !== value) {
                  form.setFieldValue('range', null);
                }

                form.getInputProps('engineType').onChange(value);
              }}
            />
            <TextInput
              label="Запас хода в (км)"
              disabled={
                EnumEngineType.ELECTRIC !==
                form.getInputProps('engineType').value
              }
            />
            <Select
              label="Трансмиссия"
              data={Object.values(EnumTransmissionType).map((item) => item)}
              disabled={
                EnumEngineType.PETROL !== form.getInputProps('engineType').value
              }
              {...form.getInputProps('transmissions')}
              value={form.values.transmissions}
            />
            <MultiSelect
              label="Комплектация"
              data={data?.configurations.map((item) => ({
                label: item.name,
                value: String(item.id),
              }))}
              {...form.getInputProps('configurations')}
            />
            <Button type="submit">Добавить</Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
