import album from './album.jpg';
import './Albumcard.css';
import data from '../../single-sample';

function Albumcard () {
    return (
        <div className='Album-wrapper'>
            <div className='Album-image'>
                <img src={data.album.images[0].url} alt=''></img>
            </div>
            <div className='Album-description'>
                <p className='Album-name'>{data.album.name}</p>
                <p className='Album-title'>{data.name}</p>
                <p className='Album-artist'>{data.artists[0].name}</p>
            </div>
            <div className='Album-button'>
                Select
            </div>
        </div>
    );
}

export default Albumcard();