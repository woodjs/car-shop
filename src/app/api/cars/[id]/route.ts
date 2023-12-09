import { CarService } from '@/server/modules/car';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const id = Number(params.id);
  const result = await CarService.findById(id);

  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  const payload = await req.json();

  console.log(payload);
  await CarService.updateById(payload);

  return NextResponse.json({ message: 'Success' });
}
