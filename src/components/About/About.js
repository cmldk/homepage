import { Trans, useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';
import Social from '../Social/Social';

export default function About() {
  const { t } = useTranslation();
  const { about } = useData();

  return (
    <div className="text-dark dark:text-light mt-6">
      <section className="max-w-xl mx-auto text-center font-['regular']">
        {about && (
          <>
            {about.pp && (
              <img
                src={about.pp}
                alt="PP"
                className="max-h-32 mx-auto rounded-full mb-5 select-none shadow-lg"
              />
            )}
            <p className="text-3xl font-bold">
              {t('greeting', { name: about.name })}
            </p>
            <p className="text-xl my-2">
              {t(about.title)}{' '}
              <span className="text-sm dark:text-gray-300">{t('from')}</span>
            </p>
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
        <div className="flex items-center justify-center mt-4">
          <Social iconClassName="px-2" />
        </div>
      </section>
    </div>
  );
}
