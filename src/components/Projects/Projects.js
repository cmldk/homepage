import { useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';

export default function Projects() {
  const { projects } = useData();
  const { t } = useTranslation();

  return (
    projects && (
      <div className="max-w-xl mx-auto font-['regular']">
        <p className="text-md text-dark dark:text-gray-300 mt-12">
          {t('project_description')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 mt-16 text-dark dark:text-light">
          {projects.map((project) => {
            const githubLink = `https://github.com/${project.path}`;
            const starSrc = `https://img.shields.io/github/stars/${project.path}?style=social`;
            const techs = project.tech.replaceAll(';', ', ');

            return (
              <div key={project.row_id} className="flex flex-col flex-wrap">
                <span className="text-sm text-portakal uppercase">{techs}</span>
                <a href={githubLink} target="_blank" rel="noreferrer">
                  <h3 className="mt-1 mb-4 text-lg text-dark dark:text-light font-semibold leading-6">
                    {project.title}
                  </h3>
                </a>
                <p className="text-sm dark:text-gray-400 line-clamp-4 mb-3">
                  {project.description}
                </p>
                <span>
                  <a
                    className="inline-block"
                    href={githubLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={starSrc} alt={'Github Stars'} className="h-5" />
                  </a>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
