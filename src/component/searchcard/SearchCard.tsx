import { useState, FC } from "react";
import { Track } from "../TrackList/TrackList";
import './SearchCard.css'



type SearchCardProps = {
    data: Track;
    handleSelectedTrack: (data: Track)=>void;
    handleUnselectedTrack: (data: Track)=>void;
}

const Searchcard: FC<SearchCardProps> = (props: SearchCardProps)=>{
    const songName = props.data.name;
    const url = props.data.album.images[0].url;
    const artistName = props.data.artists[0].name;
    const [selected, setSelected] = useState(false);
    const handleSelect = () =>{
        if(!selected){
            setSelected(true);
            props.handleSelectedTrack(props.data);
        }
        else{
            setSelected(false);
            props.handleUnselectedTrack(props.data);
        }
    }

    return(
        <div className="search-wrapper">
            <div className="sCard-Images">
                <img src={url} alt="" />
            </div>
            <div className="sCard-Content">
                <p className="song">{songName}</p>
                <p className="artist">{artistName}</p>
                <div className='sCard-button' onClick={handleSelect}>
                {
                    (!selected)? `Select` : `Deselect`
                }
            </div>
            </div>
        </div>
    )
}

export default Searchcard;