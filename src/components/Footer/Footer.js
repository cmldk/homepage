import { Trans } from 'react-i18next';
import { useData } from '../../DataProvider';
import Social from '../Social/Social';

export default function Footer() {
  const { about } = useData();

  return (
    <section className="mt-10 font-['regular']">
      <hr className="border-dark dark:border-gray-300" />
      <div className="flex items-center pt-3 pb-10">
        <Social iconClassName={'mr-4'} />
        {about?.project_github && (
          <p className="text-dark dark:text-gray-400 text-center text-sm ml-auto line-clamp-1">
            <Trans
              i18nKey={'footer_github'}
              components={[
                <a
                  href={about.project_github}
                  className="underline underline-offset-4 hover:text-portakal"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>,
              ]}
            />
          </p>
        )}
      </div>
    </section>
  );
}
