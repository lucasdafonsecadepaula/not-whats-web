import Message from './Message';

export default interface Chat {
  id: string;
  name: string;
  profileImage: string;
  messages: Message[];
}
