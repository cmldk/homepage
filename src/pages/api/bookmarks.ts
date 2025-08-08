import type { APIRoute } from 'astro';
import { fetchRaindropBookmarks } from '@lib/raindrop';

export const GET: APIRoute = async () => {
  try {
    const data = await fetchRaindropBookmarks();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in GET /api/bookmarks:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
