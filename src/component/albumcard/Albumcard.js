import './Albumcard.css';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    typography:{
        subtitle1:{
            fontSize: 10
        },
        h5:{
            fontSize:15
        }
    },
    palette:{
        primary: {
            main:'#1db954',
            contrastText: "#fff"
        }
    }
});


const Albumcard = ({ data, handleSelectedtrack, handleUnselectedTrack }) => {
    const albumName = data.album.name;
    const songName = data.name;
    const url = data.album.images[0].url;
    const artistName = data.artists[0].name;
    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        if (!selected) {
            setSelected(true);
            handleSelectedtrack(data);
        }
        else {
            setSelected(false);
            handleUnselectedTrack(data);
        }
    }


    return (
        // CHANGED TO MATERIAL UI COMPONENT CARD
        <ThemeProvider theme={theme}>

            <Card noWrap sx={{ width: 100 / 100, maxHeight: 700 }} style={{backgroundColor: '#111111', textAlign: 'start', color:"white"}}>
                <CardMedia
                    component="img"
                    height="300"
                    image={url}
                    alt={songName}
                />
                <CardContent >
                    <Typography noWrap variant="subtitle1" color="text.main">
                        {albumName}
                    </Typography>
                    <Typography noWrap gutterBottom variant="h5" component="div">
                        {songName}
                    </Typography>
                    <Typography noWrap gutterBottom variant="subtitle1" component="div">
                        {artistName}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSelect} variant="contained" color='primary' style={{borderRadius:20}}>
                        {
                            (!selected) ? `Select` : `Deselect`
                        }
                    </Button>
                    {/* <Button size="small">Learn More</Button> */}
                </CardActions>
            </Card>
        </ThemeProvider>
        // <div className='Album-wrapper'>
        //     <div className='Album-image'>
        //         <img src={url} alt=''></img>
        //     </div>
        //     <div className='Album-description'>
        //         <p className='Album-name'>{albumName}</p>
        //         <p className='Album-title'>{songName}</p>
        //         <p className='Album-artist'>{artistName}</p>
        //     </div>
        //     <div className='Album-button' onClick={handleSelect}>
        //         {
        //             (!selected)? `Select` : `Deselect`
        //         }
        //     </div>
        // </div>
    );
}

export default Albumcard;