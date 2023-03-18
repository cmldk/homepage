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
    <div className="text-dark dark:text-light mt-6 flex flex-col gap-y-20">
      <section className="font-['regular']">
        {about && (
          <>
            <div className="hidden lg:flex items-center mt-20">
              <div className="max-w-xl">
                <p className="text-3xl font-bold mb-3">
                  {t('greeting', { name: about.name })}
                </p>
                <p className="text-md dark:text-gray-300">
                  <Trans
                    i18nKey={'about'}
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
                </p>
              </div>
              {about.pp && (
                <img
                  src={about.pp}
                  alt="PP"
                  className="max-h-32 ml-auto rounded-full select-none shadow-lg"
                />
              )}
            </div>
            <div className="block lg:hidden items-center mt-10">
              {about.pp && (
                <img
                  src={about.pp}
                  alt="PP"
                  className="max-h-32 rounded-full select-none shadow-lg mb-3"
                />
              )}
              <div className="max-w-xl">
                <p className="text-3xl font-bold mb-3">
                  {t('greeting', { name: about.name })}
                </p>
                <p className="text-md dark:text-gray-300">
                  <Trans
                    i18nKey={'about'}
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
                </p>
              </div>
            </div>
          </>
        )}
        <div className="flex items-center mt-4">
          <Social iconClassName="mr-4" />
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
