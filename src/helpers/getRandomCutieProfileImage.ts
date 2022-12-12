const randomCutieImages = [
  'https://random.dog/8c9dd457-5907-4fd4-a825-f8c576fe1284.jpeg',
  'https://random.dog/5384c2a7-9b73-478e-9f32-9af9f264da1d.jpg',
  'https://random.dog/347b464b-31a8-4ccd-9c96-a2dfae0b7f08.jpeg',
  'https://random.dog/07c4e089-a7da-430a-ac09-a0da419efefa.JPG',
  'https://random.dog/ede1f022-4085-4b11-a6b2-21316d2b19cf.jpg',
  'https://random.dog/bc21dfb7-db3b-4d66-93d8-7bb4809ec1b8.jpg',
  'https://random.dog/1e8ff2fc-6a85-42c4-b9d8-a81bcf36dd98.jpg',
  'https://random.dog/9826-9348-20028.jpg',
  'https://random.dog/fd66efed-7054-4a2a-ae6b-423a52070635.jpg',
  'https://random.dog/c2ef8b9e-4ebe-4148-9684-bfa84111298f.PNG',
  'https://random.dog/8adc2518-3d07-4d05-abf5-7206aba4989c.jpg',
  'https://random.dog/441dc47a-b99b-4a74-bfe9-5159ddd1b9bf.jpg',
];

export const getRandomCutieProfileImage = () => {
  const randomIndex = Math.floor(Math.random() * randomCutieImages.length);
  return randomCutieImages[randomIndex];
};
