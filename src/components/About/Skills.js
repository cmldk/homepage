import { useTranslation } from 'react-i18next';
import { useData } from '../../DataProvider';

export default function Skills() {
  const { t } = useTranslation();
  const { skills } = useData();

  return (
    skills && (
      <div>
        <p className="text-xl font-['semibold'] mb-3">{t('skills')}</p>
        <div className="grid grid-cols-4 gap-4 text-center font-['regular'] text-md">
          {skills.map((skill) => {
            return (
              <div
                key={skill.row_id}
                className="flex items-center gap-2 py-2 px-4 h-16 border border-gray-300 dark:border-gray-600 rounded-md text-dark dark:text-light bg-gray-100 dark:bg-gray-700"
              >
                {skill?.logo && (
                  <img
                    className="h-10 w-10 rounded-md"
                    src={skill.logo}
                    alt={skill.title}
                  />
                )}
                {skill.title}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
