'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import axios from 'axios';

const PhaserGame = dynamic(() => import('@/app/game'), { ssr: false });
const Game = () => {
  return <PhaserGame />;
}

function App() {
  useEffect(() => {
    axios.post('/api/rpggo/gamemetadata', {
      game_id: '7411057c-43a0-4fbb-b4b8-f0b02ba3cb02',
    }).then((res) => {
      console.log(res);
    });
  }, []);
  return (<Game></Game>)
}

export default App;

