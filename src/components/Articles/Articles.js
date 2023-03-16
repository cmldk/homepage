import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';
import SearchInput from '../Base/SearchInput/SearchInput';
import ArticleCard from './ArticleCard';

let searchTimeout = null;

export default function Articles() {
  const [searchValue, setSearchValue] = useState('');
  const [searchedArticles, setSearchedArticles] = useState();

  const { articles } = useData();
  const { t } = useTranslation();

  useEffect(() => {
    if (searchValue) {
      const foundedSearchedItems = articles.filter(
        (a) =>
          a.title.includes(searchValue) ||
          a.tag.includes(searchValue) ||
          a.description.includes(searchValue)
      );
      setSearchedArticles(foundedSearchedItems);
    } else {
      setSearchedArticles(articles);
    }
  }, [searchValue, articles]);

  function handleSearchOnChange(value) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearchValue(value);
    }, 600);
  }

  const getArticles = () => {
    return (
      searchedArticles &&
      searchedArticles.map((article) => {
        return (
          article.title && (
            <>
              <ArticleCard article={article} />
              <div className="h-px bg-gradient-to-r opacity-75 from-gray-300 dark:from-gray-600 to-transparent last-of-type:hidden"></div>
            </>
          )
        );
      })
    );
  };

  return (
    articles && (
      <div className="max-w-xl mx-auto font-['regular']">
        <p className="text-md text-dark dark:text-gray-300 mt-12">
          {t('article_description')}
        </p>
        <SearchInput
          className={'mt-16 mb-8'}
          onChange={handleSearchOnChange}
          placeholder={t('article_search')}
        />
        {getArticles()}
      </div>
    )
  );
}
