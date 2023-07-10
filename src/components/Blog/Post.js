import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import MDComponents from './MDComponents';
import './Post.css';
import { format } from 'date-fns';
import { POST_DATE_FORMAT } from '../../lib/constants';
import * as Locales from 'date-fns/locale';
import Icon from '../Base/Icon/Icon';

export default function Post() {
  const { slug } = useParams();
  const { hash } = useLocation();
  const { posts, isLoading } = useData();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const [post, setPost] = useState(() => {
    if (posts) {
      return posts.find((a) => a.slug === slug);
    }
    return null;
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!post && posts) {
      const relatedPost = posts.find((a) => a.slug === slug);
      if (relatedPost) {
        setPost(relatedPost);
      } else {
        navigate('/404');
      }
    }
  }, [slug, post, posts, navigate]);

  useEffect(() => {
    const anchor = hash.slice(1);

    if (anchor && !isLoading) {
      const onWindowLoad = () => {
        const anchorEl = document.getElementById(anchor);
        if (anchorEl) {
          const offsetTop =
            anchorEl.getBoundingClientRect().top + window.pageYOffset - 16;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
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
    return format(new Date(post.published_at), POST_DATE_FORMAT, {
      locale: Locales[i18n.language],
    });
  };

  const getTags = () => {
    const tags = post.tag.replaceAll(';', ', ');
    return <span className="text-sm text-portakal uppercase">{tags}</span>;
  };

  return (
    post && (
      <div className="mt-12">
        <Icon
          iconName={'BsArrowLeft'}
          className={'h-7 w-7 text-dark dark:text-white cursor-pointer'}
          onClick={() => navigate('/blog')}
        />
        <Markdown
          className="max-w-2xl mx-auto text-md text-dark dark:text-light"
          components={MDComponents}
        >
          {post.content}
        </Markdown>
        <div className="flex w-full items-center justify-between text-sm flex-wrap mt-12">
          {post.tag && getTags()}
          <time dateTime={post.published_at} className="text-gray-400">
            {getDate()}
          </time>
        </div>
        <div
          className={`${
            isVisible ? 'opacity-100' : 'opacity-0'
          } fixed bottom-5 transition duration-300 right-5 p-4 flex items-center bg-mandalina hover:bg-portakal rounded-full shadow cursor-pointer`}
          onClick={scrollToTop}
        >
          <Icon iconName={'BsChevronUp'} className={'h-7 w-7 text-dark'} />
        </div>
      </div>
    )
  );
}
