import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const INQUIRY_PATH = path.join(process.cwd(), 'src/data/inquiries.json');

export async function GET() {
  try {
    const data = await fs.readFile(INQUIRY_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const inquiry = await request.json();
    
    // Read existing
    const fileData = await fs.readFile(INQUIRY_PATH, 'utf8');
    let inquiries = JSON.parse(fileData);
    
    // Add new with metadata
    const newInquiry = {
      ...inquiry,
      id: Date.now().toString(),
      status: 'new',
      timestamp: new Date().toISOString()
    };
    
    inquiries.push(newInquiry);
    
    // Write back
    await fs.writeFile(INQUIRY_PATH, JSON.stringify(inquiries, null, 2));
    
    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record inquiry' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    const fileData = await fs.readFile(INQUIRY_PATH, 'utf8');
    let inquiries = JSON.parse(fileData);
    
    inquiries = inquiries.map((inq: any) => inq.id === id ? { ...inq, status } : inq);
    
    await fs.writeFile(INQUIRY_PATH, JSON.stringify(inquiries, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
