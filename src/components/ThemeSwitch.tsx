import Switch from 'react-switch';
import { shade } from 'polished';
import { useTheme } from '../hooks/useTheme';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Switch
        onChange={toggleTheme}
        checked={theme.title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={shade(0.15, '#ececec')}
        onColor={theme.colors.primary}
      />

      {theme.title === 'dark' ? '🌜' : '🌞'}
    </>
  )
}