import {playAudio} from "../util";

const LibrarySong = ({song, songs, setCurrentSong, setSongs, audioRef, isPlaying}) => {

  const songSelectHandler = async () => {
    await setCurrentSong(song);
    audioRef.current.play();

    const newSongs = songs.map(s => {
      return {
        ...s,
        active: (s.id === song.id)
      }
    })
    setSongs(newSongs);
    playAudio(isPlaying, audioRef);
  }

  return (
    <div className={ `library-song ${song.active ? 'selected' : ''}` }
      onClick={songSelectHandler}>
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong;