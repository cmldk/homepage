import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useData } from '../../DataProvider';
import { slugify } from '../../lib/helper';

export default function RecentPosts() {
  const { t } = useTranslation();
  const { articles } = useData();

  const [recentPosts, setRecentPosts] = useState(() => {
    if (articles) {
      return articles.slice(0, 3);
    }
    return null;
  });

  useEffect(() => {
    if (articles) {
      setRecentPosts(articles.slice(0, 3));
    }
  }, [articles]);

  return (
    recentPosts && (
      <section className="font-['regular']">
        <p className="text-xl font-['semibold'] mb-3">{t('recent_posts')}</p>
        <div className="grid grid-cols-3 gap-4">
          {recentPosts.map((post) => (
            <Link
              key={post.row_id}
              to={`/articles/${slugify(post.title)}`}
              className="p-3 border-4 border-gray-200 hover:border-portakal dark:border-gray-700 dark:hover:border-portakal rounded-md"
            >
              <p className="text-lg font-['semibold']">{post.title}</p>
              <p className="text-sm font-['regular'] font-semibold uppercase my-1">
                {t('min_read', { time: post.time })}
              </p>
              <p className="text-sm line-clamp-4 dark:text-gray-400">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    )
  );
}
