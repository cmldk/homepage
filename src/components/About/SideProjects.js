import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useData } from '../../DataProvider';

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
      <section className="font-['regular'] mt-12">
        <p className="text-xl font-['semibold'] mb-3">{t('side_projects')}</p>
        <div className="grid grid-cols-3 gap-4">
          {sideProjects.map((project) => (
            <Link
              className="p-3 border-4 border-mandalina hover:border-portakal dark:border-opacity-25 dark:hover:border-opacity-100 rounded-md"
              to={'/projects'}
            >
              <p className="text-lg font-['semibold'] line-clamp-1 mb-2">
                {project.title}
              </p>
              <p className="text-sm line-clamp-3 dark:text-gray-400">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    )
  );
}
