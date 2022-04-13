import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import Albumcard from '../albumcard/Albumcard';
import './style.css'

const Albumlist = ({ list, handleSelectedtrack, handleUnselectedTrack }) => {
    return (
        <Box mx={12} >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {list.map((obj) => (
                    <Grid item xs={4} sm={4} md={4} key={obj.id}>
                        <Albumcard
                            data={obj}
                            handleSelectedtrack={handleSelectedtrack}
                            handleUnselectedTrack={handleUnselectedTrack}
                        />
                    </Grid>

                ))}
            </Grid>
        </Box>
        // <div className='wrapper'>
        //     <h1>Select track to add to your playlist</h1>
        //     {/* THE ALBUM LIST COMPONENT IS FLEXBOX STYLING */}
        //     <div className='Album-container'>
        //         {
        //             list.map((item) => (
        //                 <Albumcard
        //                     key={item.id}
        //                     data={item}
        //                     handleSelectedtrack={handleSelectedtrack}
        //                     handleUnselectedTrack={handleUnselectedTrack}
        //                 />
        //             ))
        //         }
        //     </div>
        // </div>
    )
}

export default Albumlist;