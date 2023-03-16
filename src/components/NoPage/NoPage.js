import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function NoPage() {
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <>
      {!isLoading && (
        <main className="grid min-h-full place-items-center bg-white dark:bg-dark py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-orange-300">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-light sm:text-5xl">
              {t('page_not_found')}
            </h1>
            <p className="mt-6 leading-7 text-dark dark:text-gray-300">
              {t('page_looking_for')}
            </p>
          </div>
        </main>
      )}
    </>
  );
}

export default NoPage;
