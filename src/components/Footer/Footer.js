import Social from '../Social/Social';
import { Trans } from 'react-i18next';
import { useData } from '../../DataProvider';

export default function Footer() {
  const { about } = useData();

  return (
    <section className="mt-10 font-['regular']">
      <hr className="border-dark dark:border-gray-300" />
      <div className="block md:flex items-center pt-3 pb-10">
        <span className="flex items-center order-2 md:order-1">
          <Social iconClassName={'mr-4'} />
        </span>

        {about?.project_github && (
          <p className="text-dark dark:text-gray-400 text-sm order-1 md:order-2 md:ml-auto mt-2 md:mt-0">
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
