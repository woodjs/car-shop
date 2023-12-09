import { BrandService } from '@/server/modules/brand';
import { CarService } from '@/server/modules/car';
import { ConfigurationService } from '@/server/modules/configuration';
import { NextResponse } from 'next/server';

export async function GET() {
  const configurations = await ConfigurationService.findAll();
  const colors = await CarService.findAllColors();
  const brands = await BrandService.findAll();

  return NextResponse.json({ configurations, colors, brands });
}
