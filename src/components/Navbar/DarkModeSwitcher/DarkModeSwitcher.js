import { useState } from 'react';
import useDarkSide from '../../../hooks/useDarkSide';
import clickSound from '../../../assets/audio/switch_sound.wav';
import { useData } from '../../../DataProvider';
import Icon from '../../Base/Icon/Icon';

const clickAudio = new Audio(clickSound);

export default function DarkModeSwitcher() {
  const { about } = useData();
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  );

  const toggleDarkMode = () => {
    clickAudio.play();
    setTheme(colorTheme);
    setDarkSide(!darkSide);
  };

  return (
    <>
      {about && (
        <span className="dark-mode-icon cursor-pointer mx-2 sm:mx-3 select-none">
          {darkSide ? (
            <Icon
              iconName={'BsFillMoonFill'}
              className={'h-4 w-4 text-dark dark:text-light'}
              onClick={toggleDarkMode}
            />
          ) : (
            <Icon
              iconName={'BsFillSunFill'}
              className={'h-4 w-4 text-dark dark:text-light'}
              onClick={toggleDarkMode}
            />
          )}
        </span>
      )}
    </>
  );
}
