import { format } from 'date-fns';
import * as Locales from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { POST_DATE_FORMAT } from '../../lib/constants';

function PostCard({ post }) {
  const { i18n } = useTranslation();

  const getTags = () => {
    const tags = post.tag.replaceAll(';', ', ');
    return <span className="text-sm text-portakal uppercase">{tags}</span>;
  };

  const getDate = () => {
    return format(new Date(post.published_at), POST_DATE_FORMAT, {
      locale: Locales[i18n.language],
    });
  };

  return (
    post && (
      <article
        key={post.id}
        className="flex flex-col items-start justify-between py-6"
      >
        <div className="flex w-full items-center justify-between text-sm flex-wrap">
          {post.tag && getTags()}
          <time dateTime={post.published_at} className="text-gray-400">
            {getDate()}
          </time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg text-dark dark:text-light font-semibold leading-6">
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-6 text-dark dark:text-gray-400 line-clamp-4">
            {post.description}
          </p>
        </div>
      </article>
    )
  );
}

export default PostCard;
