import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';
import Icon from '../Base/Icon/Icon';

export default function SideProjects() {
  const { t } = useTranslation();
  const { projects } = useData();

  const [sideProjects, setSideProjects] = useState(() => {
    if (projects) {
      return projects.slice(0, 3);
    }
    return null;
  });

  useEffect(() => {
    if (projects) {
      setSideProjects(projects.slice(0, 3));
    }
  }, [projects]);

  return (
    sideProjects && (
      <section className="font-['regular']">
        <p className="text-xl font-['semibold'] mb-3">{t('side_projects')}</p>
        <div className="grid grid-cols-3 gap-4">
          {sideProjects.map((project) => (
            <a
              key={project.row_id}
              className="p-3 border-4 border-gray-200 hover:border-portakal dark:border-gray-700 dark:hover:border-portakal rounded-md"
              href={`https://github.com/${project.path}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex items-center mb-2">
                <p className="text-lg font-['semibold'] line-clamp-1">
                  {project.title}
                </p>
                <span className="ml-auto">
                  <Icon iconName={'BsBoxArrowUpRight'} />
                </span>
              </span>
              <p className="text-sm line-clamp-5 dark:text-gray-400">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    )
  );
}
