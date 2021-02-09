
const LibrarySong = ({song, songs, setCurrentSong, setSongs, audioRef, isPlaying}) => {

  const songSelectHandler = () => {
    setCurrentSong(song);
    audioRef.current.play();

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(audio => {
          audioRef.current.play();
        })
      }
    }

    const newSongs = songs.map(s => {
      return {
        ...s,
        active: (s.id === song.id)
      }
    })
    setSongs(newSongs)


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