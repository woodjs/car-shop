export interface ICarCreateDB {
  brandId: number;
  image: string;
  model: string;
  color?: string | null;
  price: number;
  year: number;
  engineType: string;
  transmissions?: string | null;
  range?: number | null;
}

export interface ICarCreate extends ICarCreateDB {
  configurations: number[];
}

export interface ICarUpdate extends ICarCreate {
  id: number;
}

export interface IBrand {
  id: number;
  name: string;
}

export interface ICarBase {
  id: number;
  image: string;
  model: string;
  brand: {
    id: number;
    name: string;
  };
  color?: string | null;
  price: number;
  year: number;
}

export interface IConfiguration {
  id: number;
  name: string;
}

export interface ICarConfiguration {
  carId: number;
  configurationId: number;
}

export interface ICarDetail extends ICarBase {
  engineType: string;
  transmission?: string;
  range?: number | null;
  configurations: IConfiguration[];
}

export interface IFilters {
  yearFrom?: string;
  yearTo?: string;
  priceFrom?: string;
  priceTo?: string;
  sortPriceBy?: string;
  colors?: string[];
  configurations?: string[];
  limit?: number | string;
  page?: number | string;
  brands?: string[];
}
