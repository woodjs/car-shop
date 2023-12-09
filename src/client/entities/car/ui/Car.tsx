'use client';

import { FC } from 'react';
import { Card, Image, Text, Stack } from '@mantine/core';
import { formattedAmount } from '@/client/shared/lib';
import Link from 'next/link';

interface ICarProps {
  id: number;
  image: string;
  brand: string;
  model: string;
  price: number;
  yearManufacture: number;
}

export const Car: FC<ICarProps> = ({
  id,
  image,
  brand,
  model,
  price,
  yearManufacture,
}) => {
  return (
    <Link href={`/car/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ cursor: 'pointer' }}
      >
        <Card.Section>
          <Image src={image} height={160} alt="Norway" fit="cover" />
        </Card.Section>

        <Stack gap="xs" mt="xs">
          <Text fw={500} size="xl" c="blue">
            {brand} {model}
          </Text>

          <Text size="sm" c="dimmed">
            Год выпуска: {yearManufacture}
          </Text>

          <Text fw="bold">{formattedAmount({ amount: price })}</Text>
        </Stack>
      </Card>
    </Link>
  );
};
