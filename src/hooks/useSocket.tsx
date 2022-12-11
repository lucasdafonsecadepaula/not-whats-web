import { getRandomCutieProfileImage } from '@/helpers/getRandomCutieProfileImage';
import { Room } from '@/models/Room';
import User from '@/models/User';
import usersReducer from '@/reducers/usersReducer';
import { socket } from '@/services/socket';
import { faker } from '@faker-js/faker';
import Peer from 'peerjs';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

const userName = localStorage.getItem('userName') || faker.name.fullName();
const profileImage = localStorage.getItem('profileImage') || getRandomCutieProfileImage();
const sessionId = localStorage.getItem('sessionId');
localStorage.setItem('userName', userName);
localStorage.setItem('profileImage', profileImage);

const useSocket = () => {
  const [myData, setMyData] = useState<User>({
    id: sessionId || '',
    name: userName,
    profileImage,
  });
  const [room, setRoom] = useState<Room>(null);
  const mySessionInstance = useRef(sessionId);
  const roomIdInstance = useRef(null as string | null);
  const peerInstance = useRef<any>(null);

  const [users, dispatch] = useReducer(usersReducer, new Map());

  useEffect(() => {
    socket.auth = { userName, sessionId };
    socket.io.opts.query = { profileImage };
    socket.connect();

    const peer = new Peer();
    peerInstance.current = peer;
    peer.on('open', (peerId) => {
      socket.emit('config:set-my-peer', { peerId });
    });

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

    socket.on('init:session', ({ sessionId }) => {
      setMyData((pre) => ({ ...pre, id: sessionId }));
      mySessionInstance.current = sessionId;
      localStorage.setItem('sessionId', sessionId);
    });

    socket.on('user:all-users', ({ allUsers }) => {
      dispatch({ type: 'SET-ALL-USERS', payload: allUsers });
    });

    socket.on('user:new-user-connected', ({ newUser }) => {
      dispatch({ type: 'ADD-NEW-USER', payload: newUser });
    });

    socket.on('user:user-disconnected', ({ user }) => {
      dispatch({ type: 'REMOVE-USER', payload: user });
    });

    socket.on('config:user', ({ user }) => {
      dispatch({ type: 'UPDATE-USER-CONFIG', payload: user });
    });

    socket.on('config:new-peer', ({ userPeer: { id, peerId } }) => {
      dispatch({ type: 'SET-USER-PEER-ID', payload: { userId: id, peerId } });
    });

    socket.on('message:history-by-user', ({ messages }) => {
      setRoom((pre) => {
        if (!pre) return null;
        return { ...pre, messages: messages };
      });
    });

    socket.on('message:receive', ({ newMessage }) => {
      console.count('notification');
      socket.emit('message:receive-check', { message: newMessage });
      const userId =
        mySessionInstance.current === newMessage.from.id ? newMessage.to.id : newMessage.from.id;

      if (roomIdInstance.current === userId) {
        dispatch({ type: 'ATT-LAST-MESSAGE', payload: { userId, lastMessage: newMessage } });
        setRoom((prev) => {
          if (!prev) return null;
          return { ...prev, messages: [...prev.messages, newMessage] };
        });
      } else {
        dispatch({ type: 'ATT-NOTIFICATION', payload: { userId, lastMessage: newMessage } });
      }
    });

    return () => {
      socket.off('init:session');
      socket.off('user:all-users');
      socket.off('user:new-user-connected');
      socket.off('user:user-disconnected');
      socket.off('config:user');
      socket.off('config:new-peer');
      socket.off('message:history-by-user');
      socket.off('message:receive');
      socket.disconnect();
      peer.destroy();
    };
  }, []);

  const openChat = useCallback(({ id, name }: { id: string; name: string }) => {
    if (id === null) return;
    socket.emit('message:history-by-user', { userId: id });
    setRoom({ id, name, messages: [] });
    roomIdInstance.current = id;
    dispatch({ type: 'RESET-NOTIFICATION', payload: { userId: id } });
  }, []);

  const changeMyConfig = useCallback((newConfig: Omit<Partial<User>, 'id'>) => {
    if (newConfig.name) localStorage.setItem('userName', newConfig.name);
    if (newConfig.profileImage) localStorage.setItem('profileImage', newConfig.profileImage);
    setMyData((prev) => ({ ...prev, ...newConfig }));
    socket.emit('config:my', { newConfig });
  }, []);

  const sendMensage = useCallback(
    ({ text, to }: { text: string; to: { id: string; name: string } }) => {
      socket.emit('message:send', { message: { to, text } });
    },
    [],
  );

  const createGroup = useCallback(() => {
    socket.emit('group:create', { group: { id: '1', profileImage: null, userName: 'TEST' } });
  }, []);

  return { myData, users, room, openChat, sendMensage, changeMyConfig, createGroup };
};

export default useSocket;
