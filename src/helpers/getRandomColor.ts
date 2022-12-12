const colors = [
  '#f15c6d',
  '#53bdeb',
  '#ffd279',
  '#ff72a1',
  '#06cf9c',
  '#a5b337',
  '#42c7b8',
  '#7f66ff',
  '#d88deb',
  '#fc9775',
  '#fa6533',
  '#25d366',
  '#a791ff',
  '#02a698',
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
