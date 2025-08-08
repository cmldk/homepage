const RAINDROP_API_BASE_URL = 'https://api.raindrop.io/rest/v1';
const COLLECTION_ID = import.meta.env.RAINDROP_COLLECTION_ID;
const RAINDROP_TOKEN = import.meta.env.RAINDROP_API_TOKEN;

export async function fetchRaindropBookmarks() {
  if (!COLLECTION_ID || !RAINDROP_TOKEN) {
    throw new Error('Missing Raindrop credentials');
  }

  const api_url = `${RAINDROP_API_BASE_URL}/raindrops/${COLLECTION_ID}?sort=-created&perpage=50&page=0`;

  const response = await fetch(api_url, {
    headers: {
      Authorization: `Bearer ${RAINDROP_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Raindrop.io API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  if (!data.items) {
    throw new Error(
      `Invalid response from Raindrop API: 'items' array missing.`
    );
  }

  return {
    bookmarks: data.items,
    totalCount: data.count || 0,
  };
}
