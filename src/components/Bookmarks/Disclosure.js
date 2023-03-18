import { format, parse } from 'date-fns';
import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { BOOKMARK_GROUP_FORMAT } from '../../lib/constants';
import * as Locales from 'date-fns/locale';
import BookmarkCard from './BookmarkCard';
import { useTranslation } from 'react-i18next';
import BookmarkButton from './BookmarkButton';

const ListDisclosure = ({ date, bookmarks }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { i18n } = useTranslation();

  const handleDisclosure = () => {
    setIsOpen(!isOpen);
  };

  const getDate = () => {
    return format(
      parse(date, BOOKMARK_GROUP_FORMAT, new Date()),
      BOOKMARK_GROUP_FORMAT,
      { locale: Locales[i18n.language] }
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <BookmarkButton onClick={handleDisclosure}>{getDate()}</BookmarkButton>
        <div className="cursor-pointer ml-2" onClick={handleDisclosure}>
          {isOpen ? (
            <RiArrowUpSLine className="text-dark dark:text-gray-400" />
          ) : (
            <RiArrowDownSLine className="text-dark dark:text-gray-400" />
          )}
        </div>
      </div>

      <div
        className={`${isOpen ? 'overflow-y-auto' : 'max-h-0 overflow-hidden'}`}
      >
        {bookmarks.map((bookmark) => {
          return (
            bookmark.url && (
              <>
                <BookmarkCard bookmark={bookmark} />
                <div className="h-px bg-gradient-to-r opacity-75 from-gray-300 dark:from-gray-600 to-transparent last-of-type:hidden"></div>
              </>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ListDisclosure;
