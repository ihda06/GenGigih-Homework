import './RecentSearch.css'
import {FC} from 'react';

type RecentSearchProps = {
    img: string;
    title: string;
    artist: string;
}

const RecentSearch: FC<RecentSearchProps> = (props: RecentSearchProps)=>{

    return(
        <div className="Recent-container">
            <div className="thumbnail-wrapper">
                <img src={props.img} alt="" className="thumbnail" />
            </div>
            <div className="Content-recent-wrapper">
                <p className="track-title">{props.title}</p>
                <p className="artist-name">{props.artist}</p>
            </div>
        </div>
    )
}

export default RecentSearch;