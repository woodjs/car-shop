import { SimpleGrid, Skeleton } from '@mantine/core';

export default function SkeletonList() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} h={300} />
        ))}
    </SimpleGrid>
  );
}
