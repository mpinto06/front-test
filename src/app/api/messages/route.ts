import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const externalApiUrl = 'https://prod2.readychatai.com/business/mock-messages';
    const response = await fetch(externalApiUrl);

    if (!response.ok) {
      const errorData = await response.json(); 
      return NextResponse.json(
        { message: `Failed to fetch messages: ${errorData.message || response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error while fetching messages.' },
      { status: 500 }
    );
  }
}