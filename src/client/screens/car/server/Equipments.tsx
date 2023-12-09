import { List, Stack, Text } from '@mantine/core';
import { FC } from 'react';

interface IEquipmentsProps {
  attributes: {
    id: number;
    name: string;
  }[];
}

export const Equipments: FC<IEquipmentsProps> = ({ attributes }) => {
  return (
    <Stack w="100%">
      <Text fz="22px" fw="bold">
        Комплектация
      </Text>
      <List>
        {attributes.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </List>
    </Stack>
  );
};
