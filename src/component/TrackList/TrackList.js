import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import TrackCard from '../TrackCard/TrackCard';
import './TrackList.css'

const TrackList = ({ list, handleSelectedtrack, handleUnselectedTrack }) => {
    return (
        <Box mx={12} >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {list.map((obj) => (
                    <Grid item xs={4} sm={4} md={4} key={obj.id} aria-label="card">
                        <TrackCard
                            
                            data={obj}
                            handleSelectedtrack={handleSelectedtrack}
                            handleUnselectedTrack={handleUnselectedTrack}
                        />
                    </Grid>

                ))}
            </Grid>
        </Box>
    )
}

export default TrackList;