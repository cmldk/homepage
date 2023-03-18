import { format } from 'date-fns';
import * as Locales from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ARTICLE_DATE_FORMAT } from '../../helper/constants';

function ArticleCard({ article }) {
  const { i18n } = useTranslation();

  const getTags = () => {
    const tags = article.tag.replaceAll(';', ', ');
    return (
      <span className="text-sm text-portakal uppercase flex-1">{tags}</span>
    );
  };

  const getDate = () => {
    return format(new Date(article.published_at), ARTICLE_DATE_FORMAT, {
      locale: Locales[i18n.language],
    });
  };

  return (
    article && (
      <article
        key={article.id}
        className="flex flex-col items-start justify-between py-6"
      >
        <div className="flex w-full items-center text-sm truncate">
          {article.tag && getTags()}
          <time dateTime={article.published_at} className="text-gray-400">
            {getDate()}
          </time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg text-dark dark:text-light font-semibold leading-6">
            <Link key={article.slug} to={`/articles/${article.slug}`}>
              <span className="absolute inset-0" />
              {article.title}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-6 text-dark dark:text-gray-400 line-clamp-4">
            {article.description}
          </p>
        </div>
      </article>
    )
  );
}

export default ArticleCard;
