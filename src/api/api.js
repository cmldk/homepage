import { BASE_URL, MAIN_TABLE_ID } from '../lib/constants';
import { setDefaultTranslation } from '../i18n/i18n';

export const fetchMainTable = async (handleTableResponse, setRevalidate) => {
  const API_MAIN_RETABLE_URL = `${BASE_URL}/${MAIN_TABLE_ID}/json`;

  // if translation table not exist, then we will set default locale en.json
  let hasTranslationTable = false;

  fetch(API_MAIN_RETABLE_URL)
    .then((response) => response.json())
    .then((jsonData) => {
      // fetch given necessary tables data
      jsonData.data.forEach((row) => {
        if (row.key && handleTableResponse.hasOwnProperty(row.key)) {
          if (row.key === 'translation') hasTranslationTable = true;
          fetchSingleTableData(
            row.table_id,
            handleTableResponse[row.key],
            row.url_param
          );
        }
      });

      if (!hasTranslationTable) setDefaultTranslation();
      if (setRevalidate) setRevalidate(true);
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
