import { Trans, useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';
import Social from '../Social/Social';
import RecentPosts from './RecentPosts';
import SideProjects from './SideProjects';
import Skills from './Skills';

export default function About() {
  const { t } = useTranslation();
  const { about } = useData();

  return (
    <div className="text-dark dark:text-light mt-6 flex flex-col gap-y-16">
      <section className="max-w-xl font-['regular']">
        {about && (
          <>
            {about.pp && (
              <img
                src={about.pp}
                alt="PP"
                className="max-h-32 rounded-full mb-5 select-none shadow-lg"
              />
            )}
            <p className="text-xl font-bold">
              {t('greeting', { name: about.name })}
            </p>
            <div className="flex items-center gap-x-3 my-2">
              <p className="text-3xl font-bold">{t(about.title)} </p>
              <span className="text-sm dark:text-gray-300">{t('from')}</span>
            </div>
            <p className="text-md dark:text-gray-300">
              {t(about.about)}{' '}
              <Trans
                i18nKey={'currently_working'}
                values={{ company: about.company }}
                components={[
                  <a
                    href={about.company_url}
                    alt={about.company}
                    target="_blank"
                    rel="noreferrer"
                    className="text-portakal"
                  >
                    link
                  </a>,
                ]}
              />
              .
            </p>
          </>
        )}
        <div className="flex items-center mt-4">
          <Social iconClassName="mx-2" />
        </div>
      </section>
      <Skills />
      <span className="flex flex-col gap-y-8">
        <RecentPosts />
        <SideProjects />
        <div className="flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full dark:bg-gray-300 bg-dark"></div>
          <div className="mx-1.5 w-1.5 h-1.5 rounded-full dark:bg-gray-300 bg-dark"></div>
          <div className="w-1.5 h-1.5 rounded-full dark:bg-gray-300 bg-dark"></div>
        </div>
      </span>
    </div>
  );
}
