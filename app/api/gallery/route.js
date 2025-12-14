import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import DOMPurify from 'isomorphic-dompurify';

const dataFilePath = path.join(process.cwd(), 'data', 'gallery.json');
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

async function ensureUploadDir() {
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }
}

async function getGallery() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveGallery(gallery) {
    await fs.writeFile(dataFilePath, JSON.stringify(gallery, null, 2));
}

export async function GET() {
    const gallery = await getGallery();
    return NextResponse.json(gallery);
}

export async function POST(request) {
    await ensureUploadDir();
    const formData = await request.formData();

    const image = formData.get('image'); // File object
    const descriptionRaw = formData.get('description') || '';

    // Sanitize Description
    const description = DOMPurify.sanitize(descriptionRaw);

    if (!image || !(image instanceof File)) {
        return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    const imagePath = `/uploads/${filename}`;

    const gallery = await getGallery();
    const newItem = {
        id: Date.now(),
        url: imagePath,
        description: description,
        timestamp: new Date().toISOString()
    };

    gallery.unshift(newItem); // Add new item to the beginning
    await saveGallery(gallery);

    return NextResponse.json(newItem, { status: 201 });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    let gallery = await getGallery();
    gallery = gallery.filter(item => item.id !== id);
    await saveGallery(gallery);

    return NextResponse.json({ success: true });
}
