import initialData from '@/helpers/initialData';
import { ChatWithOnlyUserType } from '@/models/Chat';
import { Room } from '@/models/Room';
import chatsReducer from '@/reducers/chatsReducer';
import { socket } from '@/services/socket';
import Peer from 'peerjs';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

const { name, profileImage, sessionId } = initialData();

type MyDataProps = { id: string; name: string; profileImage: string };

const useSocket = () => {
  const [myData, setMyData] = useState<MyDataProps>({ id: sessionId, name, profileImage });
  const [room, setRoom] = useState<Room>(null);
  const mySessionInstance = useRef(sessionId);
  const roomIdInstance = useRef<string | null>(null);
  const peerInstance = useRef<Peer | null>(null);

  const [chats, dispatchChats] = useReducer(chatsReducer, new Map());

  useEffect(() => {
    socket.auth = { name, sessionId, profileImage };
    socket.connect();

    const peer = new Peer();
    peerInstance.current = peer;
    peer.on('open', (peerId) => {
      socket.emit('config:set-my-peer', { peerId });
    });

    socket.on('init:session', ({ sessionId }) => {
      setMyData((pre) => ({ ...pre, id: sessionId }));
      mySessionInstance.current = sessionId;
      localStorage.setItem('sessionId', sessionId);
    });

    socket.on('chat:all-chats', ({ allChats }) => {
      dispatchChats({ type: 'SET-ALL-CHATS', payload: allChats });
    });

    socket.on('chat:new-chat', ({ newChat }) => {
      dispatchChats({ type: 'ADD-NEW-CHAT', payload: newChat });
    });

    socket.on('chat:remove-chat', ({ chat }) => {
      if (roomIdInstance.current === chat.id) setRoom(null);
      dispatchChats({ type: 'REMOVE-CHAT', payload: chat });
    });

    socket.on('config:chat', ({ chat }) => {
      dispatchChats({ type: 'UPDATE-CHAT-CONFIG', payload: chat });
    });

    socket.on('config:new-peer', ({ chatPeer: { id, peerId } }) => {
      dispatchChats({ type: 'SET-CHAT-PEER-ID', payload: { chatId: id, peerId } });
    });

    socket.on('message:history-by-chat', ({ messages }) => {
      setRoom((pre) => {
        if (!pre) return null;
        return { ...pre, messages: messages };
      });
    });

    socket.on('message:receive', ({ newMessage, chatId: messageChatId }) => {
      const isAGroupMessage = mySessionInstance.current !== messageChatId;
      const chatId = isAGroupMessage ? messageChatId : newMessage.from.id;
      const isThisRoomOpen = roomIdInstance.current === chatId;

      if (isThisRoomOpen) {
        setRoom((prev) => {
          if (!prev) return null;
          return { ...prev, messages: [...prev.messages, newMessage] };
        });
      }

      dispatchChats({
        type: 'RECEIVE-MESSAGE',
        payload: { chatId, message: newMessage, isThisRoomOpen },
      });

      socket.emit('message:receive-check', { message: newMessage, chatId });
    });

    return () => {
      socket.off('init:session');
      socket.off('chat:all-chats');
      socket.off('config:new-peer');
      socket.off('message:history-by-chat');
      socket.off('message:receive');
      socket.disconnect();
      peer.destroy();
    };
  }, []);

  const openChat = useCallback(
    ({ id, name, profileImage }: { id: string; name: string; profileImage: string | null }) => {
      if (id === null) return;
      socket.emit('message:history-by-chat', { chatId: id });
      setRoom({ id, name, profileImage, messages: [] });
      roomIdInstance.current = id;
      dispatchChats({ type: 'RESET-NOTIFICATION', payload: { userId: id } });
    },
    [],
  );

  const changeMyConfig = useCallback(
    ({ newConfig }: { newConfig: { name?: string; profileImage?: string } }) => {
      if (newConfig.name) localStorage.setItem('name', newConfig.name);
      if (newConfig.profileImage) localStorage.setItem('profileImage', newConfig.profileImage);
      setMyData((prev) => ({ ...prev, ...newConfig }));
      socket.emit('config:my', { newConfig });
    },
    [],
  );

  const sendMensage = useCallback(
    ({ text, to }: { text: string; to: { id: string; name: string } }) => {
      if (roomIdInstance.current === null) return;
      const from = { id: myData.id, name: myData.name };
      socket.emit('message:send', { message: { to, text, from }, chatId: roomIdInstance.current });
    },
    [myData],
  );

  const createGroup = useCallback(
    ({ groupName, groupUsers }: { groupName: string; groupUsers: ChatWithOnlyUserType[] }) => {
      socket.emit('group:create', { group: { groupName, groupUsers } });
    },
    [],
  );

  return { myData, chats, room, openChat, sendMensage, changeMyConfig, createGroup } as const;
};

export default useSocket;

// peer.on('call', (call) => {
//   handleReceiveCall(call);
//   navigator.mediaDevices
//     .getUserMedia({ audio: true, video: true })
//     .then((mediaStream) => {
//       currentUserAudioRef.current.srcObject = mediaStream;
//       currentUserAudioRef.current.play();
//       call.answer(mediaStream);
//       call.on('stream', function (remoteStream) {
//         remoteUserAudioRef.current.srcObject = remoteStream;
//         remoteUserAudioRef.current.play();
//       });
//     })
//     .catch((err) => alert(JSON.stringify(err)));
// });
