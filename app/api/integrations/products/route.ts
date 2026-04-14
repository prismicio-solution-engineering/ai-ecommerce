import { NextRequest, NextResponse } from 'next/server';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  rating: number;
}

export async function GET(request: NextRequest) {
  try {
    const productsData = await import('@/artefacts/products.json').then(
      (m) => m.default
    );
    const products: Product[] = productsData.products;

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category')?.toLowerCase() || '';

    let filtered = products;

    // Filter products based on search query
    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category if specified
    if (category) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category
      );
    }

    const results = filtered.map((product) => ({
      id: String(product.id),
      title: product.title,
      description: product.description,
      blob: {
        id: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        rating: product.rating,
      },
      image_url: product.thumbnail,
      last_update: Date.now(),
    }));

    return NextResponse.json({
      results_size: results.length,
      results,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
