import {
  BASE_URL,
  MAIN_BASE_ID,
  MAIN_TABLE_ID,
  AIRTABLE_API_TOKEN,
} from '../lib/constants';

export const fetchMainTable = async (handleTableResponse) => {
  const API_MAIN_AIRTABLE_URL = `${BASE_URL}/${MAIN_BASE_ID}/${MAIN_TABLE_ID}`;
  fetch(API_MAIN_AIRTABLE_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((jsonData) => {
      // fetch given necessary tables data
      jsonData.records.forEach((row) => {
        const setState = handleTableResponse(row.fields.key);
        if (row.fields.key && setState) {
          fetchSingleTableData(row.fields.table_id, setState);
        }
      });
    })
    .catch((error) => console.error(error));
};

const fetchSingleTableData = async (tableID, setResponse) => {
  const API_TABLE_URL = `${BASE_URL}/${MAIN_BASE_ID}/${tableID}`;

  fetch(API_TABLE_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((jsonData) => setResponse(jsonData.records))
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
