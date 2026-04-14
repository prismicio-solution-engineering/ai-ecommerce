import { NextRequest, NextResponse } from 'next/server';
import categoriesData from '@/artefacts/categories.json';

// Map categories to representative Unsplash images
const categoryImageMap: Record<string, string> = {
  beauty: 'https://images.unsplash.com/photo-1596462502278-bf77acd33e1e?w=400&h=300&fit=crop',
  fragrances: 'https://images.unsplash.com/photo-1630308323789-da0ec9d70712?w=400&h=300&fit=crop',
  furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
  groceries: 'https://images.unsplash.com/photo-1488306153991-8658c2b23d0d?w=400&h=300&fit=crop',
  'home-decoration': 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=300&fit=crop',
  'kitchen-accessories': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
  laptops: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
  'mens-shirts': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
  'mens-shoes': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop',
  'mens-watches': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
  'mobile-accessories': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
  motorcycle: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  'skin-care': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
  smartphones: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop',
  'sports-accessories': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
  sunglasses: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
  tablets: 'https://images.unsplash.com/photo-1500941359143-b8d5d20c3d46?w=400&h=300&fit=crop',
  tops: 'https://images.unsplash.com/photo-1505886657550-19a9be5de372?w=400&h=300&fit=crop',
  vehicle: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop',
  'womens-bags': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
  'womens-dresses': 'https://images.unsplash.com/photo-1595777707802-221b4ece6cae?w=400&h=300&fit=crop',
  'womens-jewellery': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
  'womens-shoes': 'https://images.unsplash.com/photo-1543163521-9145f93c5d00?w=400&h=300&fit=crop',
  'womens-watches': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=300&fit=crop',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase() || '';

  let filtered = categoriesData;

  // Filter categories based on search query
  if (query) {
    filtered = categoriesData.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.slug.toLowerCase().includes(query)
    );
  }

  const results = filtered.map((category) => ({
    id: category.slug,
    title: category.name,
    description: `Shop all ${category.name} products`,
    blob: {
      id: category.slug,
      name: category.name,
      slug: category.slug,
    },
    image_url: categoryImageMap[category.slug] || categoryImageMap.beauty,
    last_update: Date.now(),
  }));

  return NextResponse.json({
    results_size: results.length,
    results,
  });
}
