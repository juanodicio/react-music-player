import LibrarySong from "./LibrarySong";

const Library = ({libraryStatus, songs, setCurrentSong, setSongs, isPlaying, audioRef}) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library': ''}`}>
      <h2>Library</h2>

      <div className="library-songs">
        {songs.map(song => <LibrarySong key={song.id}
                                        song={song}
                                        songs={songs}
                                        isPlaying={isPlaying}
                                        setCurrentSong={setCurrentSong}
                                        setSongs={setSongs}
                                        audioRef={audioRef} /> )}
      </div>
    </div>
  );
}

export default Library;