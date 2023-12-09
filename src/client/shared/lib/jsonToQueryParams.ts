export const JSONToQueryParams = (data: {
  [key: string]: string | string[] | number;
}): string => {
  const queryParams = Object.entries(data)
    .filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;

      return Boolean(value);
    })
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map(
          (v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
        );
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(
        value as string
      )}`;
    })
    .flat()
    .join('&');

  return queryParams ? `?${queryParams}` : '';
};
