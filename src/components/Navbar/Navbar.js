import { Popover } from '@headlessui/react';
import DarkModeSwitcher from './DarkModeSwitcher/DarkModeSwitcher';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import { useData } from '../../DataProvider';

export default function Header() {
  const { t } = useTranslation();
  const { about, header } = useData();

  const location = useLocation();

  const headerItems = [
    { key: 'about', href: '/', title: t('aboutme') },
    { key: 'projects', href: '/projects', title: t('projects') },
    { key: 'articles', href: '/articles', title: t('articles') },
    { key: 'bookmarks', href: '/bookmarks', title: t('bookmarks') },
    { key: 'gallery', href: '/gallery', title: t('gallery') },
  ];

  const isActive = (href) => {
    return (
      href === location.pathname ||
      (href !== '/' && location.pathname.startsWith(href))
    );
  };

  return (
    <header className="bg-white dark:bg-dark pt-10 font-['regular']">
      <nav className="hidden sm:flex mx-auto items-center py-6">
        <span className="flex-1 logo-wrapper">
          <a href="/" className="-m-1.5 p-1.5 inline-flex logo select-none">
            {about && (
              <>
                <span className="sr-only">{`${about.name} ${about.surname}`}</span>
                <img
                  className="h-8 w-auto"
                  src={about.logo}
                  alt={`${about.name} ${about.surname}`}
                />
              </>
            )}
          </a>
        </span>
        {header && (
          <>
            <Popover.Group className="flex items-center flex-wrap">
              {headerItems.map((item, index) => {
                if (!header.includes(item.key)) {
                  return null;
                }

                return (
                  <Link
                    key={index}
                    to={item.href}
                    className={`text-sm leading-6 mr-4 select-none ${
                      isActive(item.href)
                        ? 'underline underline-offset-8 decoration-portakal text-portakal'
                        : 'dark:text-gray-400 text-dark hover:text-portakal dark:hover:text-portakal'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </Popover.Group>
            <span className="flex items-center mb-2 sm:mb-0">
              {header.includes('darkmode') && <DarkModeSwitcher />}
              {header.includes('translation') && <LanguageSwitcher />}
            </span>
          </>
        )}
      </nav>
      <nav className="flex justify-between sm:hidden mx-auto items-center py-2">
        <span>
          <a href="/" className="-m-1.5 p-1.5 inline-flex logo select-none">
            {about && (
              <>
                <span className="sr-only">{`${about.name} ${about.surname}`}</span>
                <img
                  className="h-8 w-auto"
                  src={about.logo}
                  alt={`${about.name} ${about.surname}`}
                />
              </>
            )}
          </a>
        </span>
        {header && (
          <>
            <span className="flex items-center gap-x-3">
              {header.includes('translation') && <LanguageSwitcher />}
              {header.includes('darkmode') && <DarkModeSwitcher />}
            </span>
          </>
        )}
      </nav>
      {header && (
        <Popover.Group className="flex sm:hidden items-center flex-wrap">
          {headerItems.map((item, index) => {
            if (!header.includes(item.key)) {
              return null;
            }

            return (
              <Link
                key={index}
                to={item.href}
                className={`text-sm leading-6 mb-2 sm:mb-0 mr-4 select-none ${
                  isActive(item.href)
                    ? 'underline underline-offset-8 decoration-portakal text-portakal'
                    : 'dark:text-gray-400 text-dark hover:text-portakal dark:hover:text-portakal'
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </Popover.Group>
      )}
    </header>
  );
}
