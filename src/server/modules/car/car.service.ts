import { Includeable, Op, Sequelize } from 'sequelize';

import { models } from '@/server/shared/db';
import { HttpException } from '@/server/shared/utils';

import { CarCreateDto, CarUpdateDto } from './dtos';
import { ICarUpdate, ICarCreate, IFilters } from '@/shared/interfaces';

interface IParams {
  attributes: string[];
  include: Includeable[];
  where?: {
    year?: {
      [Op.gte]?: number;
      [Op.lte]?: number;
    };
    price?: {
      [Op.gte]?: number;
      [Op.lte]?: number;
    };
    color?: {
      [Op.or]?: string[];
    };
    brandId?: {
      [Op.or]?: string[] | number[];
    };
  };
  order?: string[] | [string, string][];
  limit: number;
  offset: number;
}

export const CarService = {
  async create(payload: ICarCreate) {
    const { brandId, model, price, year, engineType } = payload;
    if (!brandId && !model && !price && !year && !engineType)
      throw Error('Некорректные параметры');

    const dto = new CarCreateDto(payload);
    const result = await models.Car.create(dto);

    if (payload.configurations) {
      await models.CarConfiguration.bulkCreate(
        payload.configurations.map((item: number) => ({
          carId: result.id,
          configurationId: item,
        }))
      );
    }

    return result;
  },

  async updateById(payload: ICarUpdate) {
    const candidate = await this.findById(payload.id);
    const dto = new CarUpdateDto(payload);

    await candidate.update(dto);

    const curConfigurations = await models.CarConfiguration.findAll({
      attributes: ['configurationId'],
      where: {
        carId: candidate.id,
      },
    }).then((res) => {
      if (res.length) return res.map((item) => item.configurationId);

      return [];
    });

    if (
      JSON.stringify(curConfigurations) !==
      JSON.stringify(payload.configurations)
    ) {
      if (curConfigurations.length) {
        await models.CarConfiguration.destroy({
          where: {
            carId: candidate.id,
          },
        });
      }

      if (payload.configurations.length) {
        await models.CarConfiguration.bulkCreate(
          payload.configurations.map((item: number) => ({
            carId: candidate.id,
            configurationId: item,
          }))
        );
      }
    }

    return true;
  },

  async findAll({ filters }: { filters: IFilters }) {
    const limit = Number(filters?.limit) || 10;
    const offset = ((Number(filters?.page) || 1) - 1) * limit;
    const params: IParams = {
      attributes: ['id', 'model', 'image', 'price', 'year'],
      include: [
        {
          model: models.Brand,
          as: 'brand',
        },
      ],

      limit,
      offset,
    };

    if (filters && Object.values(filters).length) {
      if (filters.yearFrom || filters.yearTo) {
        if (filters.yearFrom && filters.yearTo) {
          params.where = {
            year: {
              [Op.gte]: Number(filters.yearFrom),
              [Op.lte]: Number(filters.yearTo),
            },
          };
        } else if (filters.yearFrom) {
          params.where = {
            year: {
              [Op.gte]: Number(filters.yearFrom),
            },
          };
        } else {
          params.where = {
            year: {
              [Op.lte]: Number(filters.yearTo),
            },
          };
        }
      }

      if (filters.priceFrom || filters.priceTo) {
        if (filters.priceFrom && filters.priceTo) {
          params.where = {
            price: {
              [Op.gte]: Number(filters.priceFrom),
              [Op.lte]: Number(filters.priceTo),
            },
          };
        } else if (filters.priceFrom) {
          params.where = {
            price: {
              [Op.gte]: Number(filters.priceFrom),
            },
          };
        } else {
          params.where = {
            price: {
              [Op.lte]: Number(filters.priceTo),
            },
          };
        }
      }

      if (filters.sortPriceBy) {
        params.order = [['price', filters.sortPriceBy]];
      }

      if (filters.colors) {
        const data: string[] = [];

        if (Array.isArray(filters.colors)) {
          data.concat(filters.colors);
        } else {
          data.push(filters.colors);
        }

        params.where = {
          color: {
            [Op.or]: data,
          },
        };
      }

      if (filters.configurations) {
        const data: string[] = [];

        if (Array.isArray(filters.configurations)) {
          data.concat(filters.configurations);
        } else {
          data.push(filters.configurations);
        }

        params.include.push({
          model: models.Configuration,
          where: {
            name: {
              [Op.or]: data,
            },
          },
          through: {
            attributes: [],
          },
        });
      }

      if (filters.brands) {
        const data: string[] = [];

        if (Array.isArray(filters.brands)) {
          data.concat(filters.brands);
        } else {
          data.push(filters.brands);
        }

        params.where = {
          brandId: {
            [Op.or]: data,
          },
        };
      }
    }

    const result = await models.Car.findAndCountAll(params);

    return result;
  },

  async findById(id: number) {
    const candidate = await models.Car.findByPk(id, {
      attributes: {
        exclude: ['brandId'],
      },
      include: [
        {
          model: models.Brand,
          as: 'brand',
        },
        {
          model: models.Configuration,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!candidate) throw new HttpException(404, 'Машина не найдена');

    return candidate;
  },

  async findAllColors() {
    const result = await models.Car.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('color')), 'color']],

      where: {
        color: {
          [Op.not]: '',
        },
      },
    });

    return result.map((item) => item.color);
  },
};
