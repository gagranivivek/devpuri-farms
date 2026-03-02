import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Mark this route as static for static export
export const dynamic = 'force-static';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }
}

async function getProducts() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveProducts(products) {
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2));
}

export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}

export async function POST(request) {
    await ensureUploadDir();
    const formData = await request.formData();

    const name = formData.get('name');
    const price = formData.get('price');
    const description = formData.get('description');
    const image = formData.get('image'); // File object

    let imagePath = null;
    if (image && image instanceof File) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);
        imagePath = `/uploads/${filename}`;
    } else if (typeof image === 'string') {
        // Could be preserving existing URL if we support edit, but for POST this is usually new.
        // Or if no file selected, might be null.
        imagePath = image === 'null' ? null : image;
    }

    const products = await getProducts();
    const newProduct = {
        id: Date.now(),
        name,
        price,
        description,
        image: imagePath
    };

    products.push(newProduct);
    await saveProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(request) {
    await ensureUploadDir();
    const formData = await request.formData();

    const id = parseInt(formData.get('id'));
    const name = formData.get('name');
    const price = formData.get('price');
    const description = formData.get('description');
    const image = formData.get('image'); // File object or string URL

    let imagePath = null;
    if (image && image instanceof File) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);
        imagePath = `/uploads/${filename}`;
    } else {
        // If it's not a file, it's the existing URL string (or 'null')
        imagePath = formData.get('existingImage');
    }

    let products = await getProducts();
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], name, price, description, image: imagePath };
        await saveProducts(products);
        return NextResponse.json(products[index]);
    }

    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));

    let products = await getProducts();
    products = products.filter(p => p.id !== id);
    await saveProducts(products);

    return NextResponse.json({ success: true });
}
