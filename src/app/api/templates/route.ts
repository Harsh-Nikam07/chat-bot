import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_TEMPLATES } from '@/data/templates';

export async function GET() {
  // In a real app, this would fetch from a database
  return NextResponse.json({
    templates: DEFAULT_TEMPLATES,
    status: 'success'
  });
}

export async function POST(request: NextRequest) {
  try {
    const template = await request.json();
    
    // In a real app, this would save to a database
    // For now, we'll just return success
    
    return NextResponse.json({
      template: {
        ...template,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      status: 'success'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }

    // In a real app, this would delete from a database
    return NextResponse.json({
      status: 'success',
      message: 'Template deleted'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}