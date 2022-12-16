export type FontLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const fontLevel2FontSize = (level: FontLevel) => {
  return `${2 + 5 * level}px`;
};
