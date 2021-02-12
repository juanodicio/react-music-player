import { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {playAudio} from "../util";


const Player = ({currentSong, songs, setSongs, setCurrentSong,
                  songInfo, setSongInfo, isPlaying, setIsPlaying, audioRef}) => {

  const rangeRef = useRef(null);

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map(s => {
      return {
        ...s,
        active: (s.id === nextPrev.id)
      }
    })
    setSongs(newSongs);
    console.log("Hey from useEffect player");
  }

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...currentSong, currentTime: e.target.value})
  }

  const skipTrackHandler = async (direction) => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);

    if (direction === "skipForward") {
      const nextIndex = songs[(currentIndex + 1) % songs.length];
      await setCurrentSong(nextIndex);
      activeLibraryHandler(nextIndex);
    } else {
      if ((currentIndex - 1) < 0) {
        const prevIndex = songs[songs.length - 1];
        await setCurrentSong(prevIndex);
        activeLibraryHandler(prevIndex);
        playAudio(isPlaying, audioRef);
      } else {
        setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        activeLibraryHandler((currentIndex - 1) % songs.length);
      }
    }
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input ref={rangeRef} min="0"
               max={songInfo.duration || 0}
               value={songInfo.currentTime}
               onChange={dragHandler}
               type="range" />
        <p>{songInfo.duration ? getTime(songInfo.duration): "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={() => skipTrackHandler('skipBack')}
                         size="2x" icon={faAngleLeft} className="skip-back" />
        <FontAwesomeIcon size="2x" onClick={playSongHandler} className="play"
                         icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon onClick={() => skipTrackHandler('skipForward')}
                         size="2x" icon={faAngleRight} className="skip-forward" />
      </div>
    </div>
  );
}

export default Player;