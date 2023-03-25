import { BASE_URL, MAIN_TABLE_ID } from '../lib/constants';
import { setDefaultTranslation } from '../i18n/i18n';

export const fetchMainTable = async (handleTableResponse) => {
  const API_MAIN_RETABLE_URL = `${BASE_URL}/${MAIN_TABLE_ID}/json`;

  // if translation table not exist, then we will set default locale en.json
  let hasTranslationTable = false;

  fetch(API_MAIN_RETABLE_URL)
    .then((response) => response.json())
    .then((jsonData) => {
      // fetch given necessary tables data
      jsonData.data.forEach((row) => {
        const setState = handleTableResponse(row.key);
        if (row.key && setState) {
          if (row.key === 'translation') hasTranslationTable = true;
          fetchSingleTableData(row.table_id, setState, row.url_param);
        }
      });

      if (!hasTranslationTable) setDefaultTranslation();
    })
    .catch((error) => console.error(error));
};

const fetchSingleTableData = async (tableID, setResponse, urlParam) => {
  const API_RETABLE_URL = `${BASE_URL}/${tableID}/json${urlParam ?? ''}`;

  fetch(API_RETABLE_URL)
    .then((response) => response.json())
    .then((jsonData) => setResponse(jsonData.data))
    .catch((error) => console.error(error));
};

export const fetchBookmarks = async (setResponse) => {
  const sort = '-created';
  const clientSecret = process.env.REACT_APP_RAINDROP_CLIENT_SECRET;
  const collectionId = process.env.REACT_APP_RAINDROP_COLLECTION_ID;
  const apiUrl = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?sort=${sort}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${clientSecret}`,
  };
  const requestUrl = new URL(apiUrl);

  const response = await fetch(requestUrl, { headers });
  const data = await response.json();

  setResponse(
    data.items.map((item) => {
      const { _id, created, link, title, domain, tags } = item;
      return { _id, created, link, title, domain, tags };
    })
  );
};
