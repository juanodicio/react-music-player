import { useRef, useState } from 'react';
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";
import data from "./util";


import './styles/app.scss';
import Library from "./components/Library";


function App() {

  const audioRef = useRef(null)

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  });
  const [libraryStatus, setLibraryStatus] = useState(false)

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration
    })
  }

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />

      <Song currentSong={currentSong} />
      <Player currentSong={currentSong}
              isPlaying={isPlaying}
              songInfo={songInfo}
              setSongInfo={setCurrentSong}
              audioRef={audioRef}
              setIsPlaying={setIsPlaying} />

      <Library songs={songs}
               libraryStatus={libraryStatus}
               setCurrentSong={setCurrentSong}
               setSongs={setSongs}
               isPlaying={isPlaying}
               audioRef={audioRef} />
      <audio ref={audioRef}
             onTimeUpdate={timeUpdateHandler}
             onLoadedMetadata={timeUpdateHandler}
             src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
