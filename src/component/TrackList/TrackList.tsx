import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import TrackCard from '../TrackCard/TrackCard';
import './TrackList.css'

export type Track ={
    id: string;
    album: {
        name: string,
        images: { url: string }[]
    },
    name: string,
    artists: { name: string }[],
    uri:string,
}

type TrackListProps = {
    list: Track[];
    handleSelectedTrack: (data: Track)=>void;
    handleUnselectedTrack: (data: Track)=>void;
}

const TrackList: FC<TrackListProps> = (props: TrackListProps) => {
    return (
        <Box mx={12} >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {props.list.map((obj: Track) => (
                    <Grid item xs={4} sm={4} md={4} key={obj.id} aria-label="card">
                        <TrackCard
                            data={obj}
                            handleSelectedtrack={()=> props.handleSelectedTrack(obj)}
                            handleUnselectedTrack={()=> props.handleUnselectedTrack(obj)}
                        />
                    </Grid>

                ))}
            </Grid>
        </Box>
    )
}

export default TrackList;