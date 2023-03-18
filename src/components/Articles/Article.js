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
import Icon from '../Base/Icon/Icon';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleScroll = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getDate = () => {
    return format(new Date(article.published_at), ARTICLE_DATE_FORMAT, {
      locale: Locales[i18n.language],
    });
  };

  const getTags = () => {
    const tags = article.tag.replaceAll(';', ', ');
    return (
      <span className="text-sm text-portakal uppercase flex-1 text-right">
        {tags}
      </span>
    );
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
          {article.tag && getTags()}
        </div>
        <div
          className={`${
            isVisible ? 'opacity-100' : 'opacity-0'
          } fixed bottom-5 transition duration-300 right-5 p-4 flex items-center bg-mandalina hover:bg-portakal rounded-full shadow cursor-pointer`}
          onClick={scrollToTop}
        >
          <Icon iconName={'BsArrowUp'} className={'h-7 w-7 text-dark'} />
        </div>
      </div>
    )
  );
}
