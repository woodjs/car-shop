import Link from 'next/link';
import { Breadcrumbs, Button, Center, Image, Stack, Text } from '@mantine/core';

import { getCarByIdAction } from '@/server/modules/car/actions/car';

import { formattedAmount } from '@/client/shared/lib';
import { Equipments } from '@/client/screens/car/server/Equipments';
import { Characteristics } from '@/client/screens/car/server/Characteristics';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = await getCarByIdAction(Number(id));

  const attributes: { name: string; value: string | number }[] = [
    {
      name: 'Год Выпуска',
      value: result.year,
    },
    {
      name: 'Тип Двигателя',
      value: result.engineType,
    },
  ];

  if (result.transmission)
    attributes.push({ name: 'Трансмиссия', value: result.transmission });
  if (result.range)
    attributes.push({ name: 'Запас хода', value: `${result.range} км` });

  return (
    <Stack justify="space-between">
      <Breadcrumbs>
        <Link href="/">Машины</Link>
        <Text>{id}</Text>
      </Breadcrumbs>
      <Link href={`/car/${id}/update`}>
        <Button>Изменить</Button>
      </Link>
      <Center>
        <Image src={result.image} maw="400px" mah="340px" alt="" fit="cover" />
      </Center>

      <Text size="30px" fw="bold" ta="center">
        {result.brand!.name} {result.model}
      </Text>
      <Text size="30px" fw="bold" ta="center">
        {formattedAmount({ amount: result.price })}
      </Text>

      <Characteristics attributes={attributes} />

      {result.configurations.length > 0 && (
        <Equipments attributes={result.configurations} />
      )}
    </Stack>
  );
}
