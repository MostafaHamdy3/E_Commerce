export interface ThemeColors {
  primaryColor: string;
  bgScreen: string;
  bgContainer: string;
  bgLight: string;
  whiteColor: string;
  textColor: string;
  borderColor: string;
  grayText: string;
  red: string;
}

export const lightTheme: ThemeColors = {
  primaryColor: '#6058f0',
  bgScreen: '#f8f8f8',
  bgContainer: '#fff',
  bgLight: '#f2f2f2',
  whiteColor: '#ffffff',
  textColor: '#333',
  borderColor: '#BDBDBD',
  grayText: '#777',
  red: '#EB5757',
};

export const darkTheme: ThemeColors = {
  primaryColor: '#756efa',
  bgScreen: '#232321',
  bgContainer: '#31312F',
  bgLight: '#3f3f3f',
  whiteColor: '#ffffff',
  textColor: '#eee',
  borderColor: '#BDBDBD',
  grayText: '#aaa',
  red: '#EB5757',
};

export const colors = lightTheme;