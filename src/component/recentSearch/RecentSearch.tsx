import './RecentSearch.css'
import { FC } from 'react';
import { Typography } from '@mui/material';

type RecentSearchProps = {
    img: string;
    title: string;
    artist: string;
}




const RecentSearch: FC<RecentSearchProps> = (props: RecentSearchProps) => {

    return (
        <div className="Recent-container">
            <div className="thumbnail-wrapper">
                <img src={props.img} alt="" className="thumbnail" />
            </div>
            <div className="Content-recent-wrapper">
                <Typography align='left' noWrap variant='h1' sx={{ fontSize: { md: 20, sm:15, xs: 8 }, fontWeight: 800 }}>{props.title}</Typography>
                {/* <p className="track-title">{props.title}</p> */}
                <p className="artist-name">{props.artist}</p>
            </div>
        </div>
    )
}

export default RecentSearch;
