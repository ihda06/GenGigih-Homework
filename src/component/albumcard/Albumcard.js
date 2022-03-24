import './Albumcard.css';


const Albumcard = ({url, albumName, songName, artistName}) => {
    return (
        <div className='Album-wrapper'>
            <div className='Album-image'>
                <img src={url} alt=''></img>
            </div>
            <div className='Album-description'>
                <p className='Album-name'>{albumName}</p>
                <p className='Album-title'>{songName}</p>
                <p className='Album-artist'>{artistName}</p>
            </div>
            <div className='Album-button'>
                Select
            </div>
        </div>
    );
}

export default Albumcard;