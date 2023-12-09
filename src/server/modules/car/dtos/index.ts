import { ICarCreateDB } from '@/shared/interfaces';

export class CarCreateDto {
  brandId: number;
  image: string;
  model: string;
  price: number;
  year: number;
  color?: string | null;
  engineType: string;
  transmissions?: string | null;
  range?: number | null;

  constructor(data: ICarCreateDB) {
    this.brandId = data.brandId;
    this.image = data.image;
    this.model = data.model;
    this.price = data.price;
    this.year = data.year;
    this.color = data?.color;
    this.engineType = data.engineType;
    this.transmissions = data?.transmissions;
    this.range = data?.range;
  }
}

export class CarUpdateDto {
  brandId?: number;
  image?: string;
  model?: string;
  price?: number;
  year?: number;
  color?: string | null;
  engineType?: string;
  transmissions?: string | null;
  range?: number | null;

  constructor(data: ICarCreateDB) {
    this.brandId = data.brandId;
    this.image = data.image;
    this.model = data.model;
    this.price = data.price;
    this.year = data.year;
    this.color = data?.color;
    this.engineType = data.engineType;
    this.transmissions = data?.transmissions;
    this.range = data?.range;
  }
}

// export class CarUpdateDto extends CarCreateDto {
//   id: number;
//   constructor(payload: ICarUpdate) {
//     super(payload);
//     this.id = payload.id;
//   }
// }
