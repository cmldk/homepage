import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';
import SearchInput from '../Base/SearchInput/SearchInput';
import PostCard from './PostCard';

let searchTimeout = null;

export default function Posts() {
  const [searchValue, setSearchValue] = useState('');
  const [searchedPosts, setSearchedPosts] = useState();

  const { posts } = useData();
  const { t } = useTranslation();

  useEffect(() => {
    if (searchValue) {
      const foundedSearchedItems = posts.filter(
        (a) =>
          a.title.includes(searchValue) ||
          a.tag.includes(searchValue) ||
          a.description.includes(searchValue)
      );
      setSearchedPosts(foundedSearchedItems);
    } else {
      setSearchedPosts(posts);
    }
  }, [searchValue, posts]);

  function handleSearchOnChange(value) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearchValue(value);
    }, 600);
  }

  const getPosts = () => {
    return (
      searchedPosts &&
      searchedPosts.map((post) => {
        return (
          post.title && (
            <span key={post.row_id}>
              <PostCard post={post} />
              <div className="h-px bg-gradient-to-r opacity-75 from-gray-300 dark:from-gray-600 to-transparent last-of-type:hidden"></div>
            </span>
          )
        );
      })
    );
  };

  return (
    posts && (
      <div className="max-w-xl mx-auto font-['regular']">
        <p className="text-md text-dark dark:text-gray-300 mt-12">
          {t('blog_description')}
        </p>
        <SearchInput
          className={'mt-16 mb-8'}
          onChange={handleSearchOnChange}
          placeholder={t('blog_search')}
        />
        {getPosts()}
      </div>
    )
  );
}
