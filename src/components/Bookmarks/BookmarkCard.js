import { parseISO, formatDistanceToNowStrict } from 'date-fns';
import * as Locales from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

function BookmarkCard({ bookmark }) {
  const { i18n } = useTranslation();

  const getTags = () => {
    return bookmark.tag
      .split(';')
      .sort()
      .map((tag) => (
        <span
          key={tag}
          className="max-w-14 text-gray-400 text-xs pr-2 truncate inline-block"
        >
          {tag}
        </span>
      ));
  };

  return (
    bookmark.title && (
      <article className="py-4">
        <p className="flex font-semibold text-dark dark:text-light text-lg">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="line-clamp-1"
          >
            {bookmark.title}
          </a>
        </p>
        {bookmark.tag && (
          <div className="flex items-center text-gray-400">{getTags()}</div>
        )}
        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-2">
          <span>{new URL(bookmark.url).hostname}</span>
          <span>•</span>
          <span>
            {formatDistanceToNowStrict(parseISO(bookmark.created_at), {
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
