// theme/themeConfig.ts
import { ThemeConfig, theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

const antdTheme = (dark: boolean | undefined) =>
  ({
    token: {
      fontFamily: "'Lato', sans-serif",
      fontSize: 16,
    },
    algorithm: dark ? darkAlgorithm : defaultAlgorithm,
  }) as ThemeConfig;

export default antdTheme;
