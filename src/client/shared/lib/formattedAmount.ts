interface IParams {
  amount: number;
  symbol?: string;
}

export const formattedAmount = ({ amount, symbol = '₽' }: IParams): string =>
  `${amount.toLocaleString('en-US')} ${symbol}`;
