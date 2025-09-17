import { NextResponse } from 'next/server';
import { AI_MODELS } from '@/data/models';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({
    models: AI_MODELS,
    status: 'success'
  });
}