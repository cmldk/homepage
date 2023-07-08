import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BOOKMARK_GROUP_FORMAT } from '../../lib/constants';
import { bookmarkGroupByMounth } from '../../lib/helper';
import SearchInput from '../Base/SearchInput/SearchInput';
import { useData } from '../../DataProvider';
import ListDisclosure from './Disclosure';

let searchTimeout = null;

export default function Bookmarks() {
  const [searchValue, setSearchValue] = useState('');
  const [searchedBookmarks, setSearchedBookmarks] = useState();

  const { bookmarks } = useData();
  const { t } = useTranslation();

  useEffect(() => {
    if (searchValue) {
      const val = searchValue.toLowerCase();
      const foundedSearchedItems = bookmarks.filter(
        (b) =>
          b.title.includes(val) ||
          b.tags.some((tag) => tag.includes(val)) ||
          b.link.includes(val)
      );
      const groupByBookmarks = bookmarkGroupByMounth(foundedSearchedItems);
      setSearchedBookmarks(groupByBookmarks);
    } else {
      const groupByBookmarks = bookmarkGroupByMounth(bookmarks);
      setSearchedBookmarks(groupByBookmarks);
    }
  }, [searchValue, bookmarks]);

  function handleSearchOnChange(value) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearchValue(value);
    }, 600);
  }

  const sortedDates = () => {
    let sortedDates = [];
    if (searchedBookmarks) {
      // Parse the dates into JavaScript Date objects
      const parsedDates = Object.keys(searchedBookmarks).map((date) =>
        parse(date, BOOKMARK_GROUP_FORMAT, new Date())
      );

      // Sort the dates in descending order
      const sortedparsedDates = parsedDates.sort(
        (a, b) => b.getTime() - a.getTime()
      );

      // Format the sorted dates into format
      sortedDates = sortedparsedDates.map((date) =>
        format(date, BOOKMARK_GROUP_FORMAT)
      );
    }
    return sortedDates;
  };

  const getBookmarkCards = () => {
    const filteredDates = sortedDates();
    const filteredBookmarks = searchedBookmarks;

    return (
      <>
        {filteredDates.map((date) => (
          <div key={date} className="mt-4">
            <ListDisclosure date={date} bookmarks={filteredBookmarks[date]} />
          </div>
        ))}
      </>
    );
  };

  return (
    bookmarks && (
      <div className="max-w-xl mx-auto font-['regular']">
        <p className="text-md text-dark dark:text-gray-300 mt-12">
          {t('bookmark_description')}
        </p>
        <SearchInput
          className={'mt-16'}
          onChange={handleSearchOnChange}
          placeholder={t('bookmark_search')}
        />
        {getBookmarkCards()}
      </div>
    )
  );
}
