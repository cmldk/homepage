import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiArrowDownSLine } from 'react-icons/ri';
import { BOOKMARK_GROUP_FORMAT } from '../../helper/constants';
import { bookmarkGroupByMounth } from '../../helper/helper';
import SearchInput from '../Base/SearchInput/SearchInput';
import { useData } from '../../DataProvider';
import BookmarkButton from './BookmarkButton';
import ListDisclosure from './Disclosure';

let searchTimeout = null;

export default function Bookmarks() {
  const [displayAll, setDisplayAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchedBookmarks, setSearchedBookmarks] = useState();
  const initialDisplayNumber = 7;

  const { bookmarks } = useData();
  const { t } = useTranslation();

  useEffect(() => {
    if (searchValue) {
      const foundedSearchedItems = bookmarks.filter(
        (b) =>
          b.title.includes(searchValue) ||
          b.tag.includes(searchValue) ||
          b.url.includes(searchValue)
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
    let filteredBookmarks = {};
    let filteredDates = [];
    let bookmarkCount = 0;

    if (displayAll) {
      filteredDates = sortedDates();
      filteredBookmarks = searchedBookmarks;
    } else {
      const dates = sortedDates();
      for (let index = 0; index < dates.length; index++) {
        if (bookmarkCount >= initialDisplayNumber) {
          break;
        }

        const date = dates[index];
        const values = searchedBookmarks[date];

        if (values) {
          filteredBookmarks[date] = values.slice(
            0,
            initialDisplayNumber - bookmarkCount
          );
          bookmarkCount += filteredBookmarks[date].length;

          filteredDates.push(date);
        }
      }
    }

    return (
      <>
        {filteredDates.map((date) => (
          <div key={date} className="mt-4">
            <ListDisclosure date={date} bookmarks={filteredBookmarks[date]} />
          </div>
        ))}
        {!displayAll && bookmarkCount >= initialDisplayNumber && (
          <div className="flex items-center mt-12">
            <BookmarkButton onClick={() => setDisplayAll(true)}>
              {t('bookmark_show_all')}
            </BookmarkButton>

            <span
              onClick={() => setDisplayAll(true)}
              className="ml-2 cursor-pointer"
            >
              <RiArrowDownSLine className="text-dark dark:text-gray-400" />
            </span>
          </div>
        )}
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
