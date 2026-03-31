import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/products.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, product } = body;

    const fileData = await fs.readFile(DATA_PATH, 'utf8');
    let products = JSON.parse(fileData);

    if (action === 'create') {
      products.push({ ...product, id: Date.now().toString() });
    } else if (action === 'update') {
      products = products.map((p: any) => p.id === product.id ? product : p);
    } else if (action === 'delete') {
      products = products.filter((p: any) => p.id !== product.id);
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
