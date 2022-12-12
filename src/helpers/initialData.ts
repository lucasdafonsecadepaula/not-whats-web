import { faker } from '@faker-js/faker';
import { getRandomCutieProfileImage } from './getRandomCutieProfileImage';

const initialData = () => {
  const name = localStorage.getItem('name') || faker.name.fullName();
  const profileImage = localStorage.getItem('profileImage') || getRandomCutieProfileImage();
  const sessionId = localStorage.getItem('sessionId') || '';

  localStorage.setItem('name', name);
  localStorage.setItem('profileImage', profileImage);

  return { name, profileImage, sessionId };
};

export default initialData;
