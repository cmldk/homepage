import { Trans, useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';
import Social from '../Social/Social';
import RecentPosts from './RecentPosts';
import SideProjects from './SideProjects';

export default function About() {
  const { t } = useTranslation();
  const { about } = useData();

  return (
    <div className="text-dark dark:text-light mt-6 flex flex-col gap-y-12">
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
          <Social iconClassName="mr-4" />
        </div>
      </section>
      <RecentPosts />
      <SideProjects />
    </div>
  );
}
