import Icon from '../Base/Icon/Icon';
import { useData } from '../../DataProvider';

const Social = ({ iconClassName }) => {
  const { social } = useData();

  return (
    social &&
    social.map((data) => {
      if (data.icon) {
        return (
          <a
            key={data.row_id}
            href={data.url}
            target="_blank"
            rel="noreferrer"
            title={data.title}
            className={`${iconClassName ?? ''}`}
          >
            <Icon
              iconName={data.icon}
              className={
                'cursor-pointer text-dark dark:text-gray-400 text-lg hover:scale-110 transition duration-200'
              }
            />
          </a>
        );
      }

      return null;
    })
  );
};

export default Social;
