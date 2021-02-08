import { useRef, useState } from 'react';
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./util";


import './styles/app.scss';
import Library from "./components/Library";

function App() {

  const audioRef = useRef(null)

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[2]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">

      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      <Library songs={songs} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default App;
