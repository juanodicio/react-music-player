import { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying}) => {

  const audioRef = useRef(null);
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

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration
    })

  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input ref={rangeRef} min="0"
               max={songInfo.duration}
               value={songInfo.currentTime}
               onChange={dragHandler}
               type="range" />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon size="2x" icon={faAngleLeft} className="skip-back" />
        <FontAwesomeIcon size="2x" onClick={playSongHandler} className="play"
                         icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon size="2x" icon={faAngleRight} className="skip-forward" />
      </div>
      <audio ref={audioRef}
             onTimeUpdate={timeUpdateHandler}
             onLoadedMetadata={timeUpdateHandler}
             src={currentSong.audio}></audio>
    </div>

  );
}

export default Player;