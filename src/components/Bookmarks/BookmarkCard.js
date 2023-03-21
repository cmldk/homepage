import { parseISO, formatDistanceToNowStrict } from 'date-fns';
import * as Locales from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

function BookmarkCard({ bookmark }) {
  const { i18n } = useTranslation();

  const getTags = () => {
    const tags = bookmark.tags.join(', ');
    return <span className="text-xs text-portakal uppercase">{tags}</span>;
  };

  return (
    bookmark.title && (
      <article
        key={bookmark._id}
        className="flex flex-col overflow-hidden gap-1 py-4"
      >
        {bookmark.tags && (
          <div className="flex items-center flex-wrap text-gray-400">
            {getTags()}
          </div>
        )}
        <p className="flex font-semibold text-dark dark:text-light text-lg">
          <a href={bookmark.link} target="_blank" rel="noreferrer">
            {bookmark.title}
          </a>
        </p>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span>{new URL(bookmark.link).hostname}</span>
          <span>•</span>
          <span>
            {formatDistanceToNowStrict(parseISO(bookmark.created), {
              addSuffix: true,
              locale: Locales[i18n.language],
            })}
          </span>
        </div>
      </article>
    )
  );
}

export default BookmarkCard;
