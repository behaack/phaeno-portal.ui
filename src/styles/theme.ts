import { createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#eef8ee',
  '#e2ebe2',
  '#c6d4c6',
  '#a8bca8',
  '#8ea78e',
  '#7e9a7e',
  '#759475',
  '#628062',
  '#567256',
  '#466347',
];

export const theme = createTheme({
  colors: {
    myColor,
  },
  cursorType: 'pointer',
  primaryColor: 'myColor',
});
