import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useEffect } from 'react';
import TrackCard from '../trackCard/TrackCard';
// import './TrackList.css'
import { useDispatch, useSelector, RootStateOrAny, } from 'react-redux';
import { useState } from 'react';

export type Track = {
    id: string;
    album: {
        name: string,
        images: { url: string }[]
    },
    name: string,
    artists: { name: string }[],
    uri: string,
}

interface ITrack {
    id: string;
    album: {
        name: string,
        images: { url: string }[]
    },
    name: string,
    artists: { name: string }[],
    uri: string,
}

type TrackListProps = {
    list: Track[];
    handleSelectedTrack: (data: Track) => void;
    handleUnselectedTrack: (data: Track) => void;
}



const TrackList: FC<TrackListProps> = (props: TrackListProps) => {
    const [datatrack, setDatatrack] = useState<ITrack[]>([])
    // setDatatrack(props.list)
    const keyword = useSelector((state: RootStateOrAny) => state.searchResult.keyword);
    const result = useSelector((state: RootStateOrAny) => state.searchResult.value);
    const token = useSelector((state: RootStateOrAny) => state.token.value);
    const dispatch = useDispatch();


    useEffect(() => {
        setDatatrack(result)
    }, [result])

    return (

        <Box mx={12} >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {datatrack.map((obj: Track) => (
                    <Grid item xs={12} sm={4} md={3} key={obj.id} aria-label="card">
                        <TrackCard
                            data={obj}
                            handleSelectedtrack={() => props.handleSelectedTrack(obj)}
                            handleUnselectedTrack={() => props.handleUnselectedTrack(obj)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default TrackList;