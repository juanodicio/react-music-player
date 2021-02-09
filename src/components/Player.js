import { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, songs, setCurrentSong, songInfo, setSongInfo, isPlaying, setIsPlaying, audioRef}) => {
  const rangeRef = useRef(null);

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

  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);

    if (direction === "skipForward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else {
      if ((currentIndex - 1) < 0) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
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
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={() => skipTrackHandler('skipBack')} size="2x" icon={faAngleLeft} className="skip-back" />
        <FontAwesomeIcon size="2x" onClick={playSongHandler} className="play"
                         icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon onClick={() => skipTrackHandler('skipForward')} size="2x" icon={faAngleRight} className="skip-forward" />
      </div>

    </div>

  );
}

export default Player;