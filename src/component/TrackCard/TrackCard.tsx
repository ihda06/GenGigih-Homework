import './TrackCard.css';
import { useState, FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';
import { Track } from '../trackList/TrackList'

// type Track = {
//     id: string,
//     album: {
//         name: string,
//         images: { url: string }[]
//     },
//     name: string,
//     artists: { name: string }[],
//     uri:string,
// }

type trackProps = {
    data: Track;
    handleSelectedtrack: (data: Track) => void;
    handleUnselectedTrack: (data: Track) => void;
}

const theme = createTheme({
    typography: {
        subtitle1: {
            fontSize: 7
        },
        h5: {
            fontSize: 9
        }
    },
    palette: {
        primary: {
            main: '#1db954',
            contrastText: "#fff"
        }
    }
});


const TrackCard: FC<trackProps> = (props: trackProps) => {
    const albumName = props.data.album.name;
    const songName = props.data.name;
    const url = props.data.album.images[0].url;
    const artistName = props.data.artists[0].name;
    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        if (!selected) {
            setSelected(true);
            props.handleSelectedtrack(props.data);
        }
        else {
            setSelected(false);
            props.handleUnselectedTrack(props.data);
        }
    }


    return (
        // CHANGED TO MATERIAL UI COMPONENT CARD
        <ThemeProvider theme={theme}>

            <Card sx={{ width: 100 / 100, maxHeight: 700 }} style={{ backgroundColor: '#111111', textAlign: 'start', color: "white", borderRadius: 15 }}>
                <CardMedia
                    component="img"
                    // height="150"
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
                <CardActions sx={{ml:1, pb:2}}>
                    <Button size="small" onClick={handleSelect} variant="contained" color='primary' style={{ borderRadius: 20, fontSize: 7 }}>
                        {
                            (!selected) ? `Select` : `Deselect`
                        }
                    </Button>
                    {/* <Button size="small">Learn More</Button> */}
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}

export default TrackCard;