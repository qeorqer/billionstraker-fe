import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
  colors: {
    primary: [
      "#fffce0",
      "#fff8ca",
      "#fff099",
      "#ffe763",
      "#ffe036",
      "#ffdb18",
      "#ffd901",
      "#e3c000",
      "#caaa00",
      "#ae9200"
    ],
    success: [
      "#e9fbef",
      "#dbf2e2",
      "#b9e1c6",
      "#94d0a8",
      "#74c18e",
      "#60b87d",
      "#54b474",
      "#449e62",
      "#398d56",
      "#297a47"
    ],
    error: [
      "#ffe9e6",
      "#ffd2ce",
      "#ffa49b",
      "#ff7264",
      "#fe4836",
      "#fe2e19",
      "#ff1f09",
      "#e41100",
      "#cb0700",
      "#b20000"
    ],
    warning: [
      "#fff9e1",
      "#fff1cb",
      "#ffe19a",
      "#ffd164",
      "#ffc338",
      "#ffba1c",
      "#ffb609",
      "#e39f00",
      "#ca8d00",
      "#af7900"
    ],
    info: [
      "#e4f8ff",
      "#d3ebfc",
      "#a9d4f1",
      "#7cbce8",
      "#57a8df",
      "#3e9bdb",
      "#2e95da",
      "#1d81c2",
      "#0973af",
      "#00639c"
    ],
  },
  black: '#1E1E1E',
  white: '#FFFFFF',
  other: {
    appBackground: '#1E1E1E',
    cardBackground: '#333333',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        variant: 'filled',
      },
    },
    Input: {
      defaultProps: {
        size: 'md',
      },
    },
  },
}); 