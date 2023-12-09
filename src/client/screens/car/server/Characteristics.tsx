import { FC } from 'react';
import { SimpleGrid, Stack, Text } from '@mantine/core';

interface ICharacteristicsProps {
  attributes: {
    name: string;
    value: string | number;
  }[];
}

export const Characteristics: FC<ICharacteristicsProps> = ({ attributes }) => {
  return (
    <Stack>
      <Text fw="bold" fz="22px">
        Характеристики
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} w="100%">
        {attributes.map((item, index) => (
          <Stack gap="3px" key={index + 1}>
            <Text c="dimmed">{item.name}</Text>
            <Text fw="bold">{item.value}</Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
