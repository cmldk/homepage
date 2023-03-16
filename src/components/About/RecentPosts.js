import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';

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
      <section className="font-['regular'] mt-12">
        <p className="text-2xl font-['semibold'] mb-3">Recent Posts</p>
        <div className="grid grid-cols-3 gap-4">
          {recentPosts.map((post) => (
            <div className="p-3 border-4 border-mandalina hover:border-portakal dark:border-opacity-25 dark:hover:border-opacity-100 rounded-md cursor-pointer">
              <p className="text-lg font-['semibold']">{post.title}</p>
              <p className="text-sm font-['regular'] font-semibold uppercase my-1">
                {t('min_read', { time: post.time })}
              </p>
              <p className="text-sm line-clamp-5">{post.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  );
}
