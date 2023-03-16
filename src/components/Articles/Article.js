import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import MDComponents from './MDComponents';
import './Article.css';
import { format } from 'date-fns';
import { ARTICLE_DATE_FORMAT } from '../../helper/constants';
import * as Locales from 'date-fns/locale';

export default function Article() {
  const { slug } = useParams();
  const { hash } = useLocation();
  const { articles, isLoading } = useData();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const [article, setArticle] = useState(() => {
    if (articles) {
      return articles.find((a) => a.slug === slug);
    }
    return null;
  });

  useEffect(() => {
    if (!article && articles) {
      const relatedArticle = articles.find((a) => a.slug === slug);
      if (relatedArticle) {
        setArticle(relatedArticle);
      } else {
        navigate('/404');
      }
    }
  }, [slug, article, articles, navigate]);

  useEffect(() => {
    const anchor = hash.slice(1);

    if (anchor && !isLoading) {
      const onWindowLoad = () => {
        const anchorEl = document.getElementById(anchor);
        if (anchorEl) {
          anchorEl.scrollIntoView({ behavior: 'smooth' });
        }
      };

      if (document.readyState === 'complete') {
        onWindowLoad();
      } else {
        window.onload = onWindowLoad;
      }
    }
  }, [hash, isLoading]);

  const getDate = () => {
    return format(new Date(article.published_at), ARTICLE_DATE_FORMAT, {
      locale: Locales[i18n.language],
    });
  };

  const getTags = () => {
    return article.tag
      .split(';')
      .sort()
      .map((tag) => (
        <div
          key={tag}
          className="rounded-full max-w-14 truncate py-1 px-3 text-xs bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {tag}
        </div>
      ));
  };

  return (
    article && (
      <div className="mt-12">
        <Markdown
          className="max-w-2xl mx-auto text-md text-dark dark:text-light"
          components={MDComponents}
        >
          {article.content}
        </Markdown>
        <div className="flex items-center gap-x-4 text-xs truncate mt-12">
          <time
            dateTime={article.published_at}
            className="text-gray-400 flex-1"
          >
            {getDate()}
          </time>
          {article.tag && (
            <div className="flex items-center text-gray-400 gap-x-2">
              {getTags()}
            </div>
          )}
        </div>
      </div>
    )
  );
}
