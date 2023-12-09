import { NextResponse } from 'next/server';
import { BrandService } from '@/server/modules/brand';

export async function GET() {
  const result = await BrandService.findAll();
  return NextResponse.json(result);
}
