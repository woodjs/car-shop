import { NextRequest, NextResponse } from 'next/server';
import { CarService } from '@/server/modules/car';
// import { models } from '../../../server/shared/db';
// const models = require('@/server/shared/db/models');

interface IParams {
  [key: string]: string | string[];
}

export async function GET(req: NextRequest) {
  const params: IParams = {};

  for (let [key, value] of req.nextUrl.searchParams.entries()) {
    if (params.hasOwnProperty(key)) {
      if (Array.isArray(params[key])) {
        (params[key] as string[]).push(value);
      } else {
        params[key] = [params[key] as string, value];
      }
    } else {
      params[key] = value;
    }
  }

  const cars = await CarService.findAll({ filters: params });

  return NextResponse.json(cars);
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  await CarService.create(payload);

  return NextResponse.json({ ok: true });
}
