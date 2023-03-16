import { IconContext } from 'react-icons';
import * as Icons from 'react-icons/bs';

function Icon({ iconName, className, onClick }) {
  const Icon = Icons[iconName];
  return (
    Icon && (
      <IconContext.Provider
        value={{
          className: className,
        }}
      >
        <Icon onClick={onClick} />
      </IconContext.Provider>
    )
  );
}

export default Icon;
