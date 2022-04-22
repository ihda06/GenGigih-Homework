import React, { FC } from 'react';
import { IPlaylist } from '../../pages/CreatePlaylistPage/CreatePlaylistPage';
import './CreatePlaylist.css';

// import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import FormControl, { useFormControl } from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
// import FormHelperText from '@mui/material/FormHelperText';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { light } from '@mui/material/styles/createPalette';

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
        mode: 'dark',
        primary: {
            main: '#1db954',
            contrastText: 'white'
        }
    },
    
});


type CreatePlaylistProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputText: string;
    newPlaylist: IPlaylist;
}


const CreatePlaylist: FC<CreatePlaylistProps> = (props: CreatePlaylistProps) => {
    const validation = (playlist: IPlaylist)=>{
        if (playlist.tracks.length > 0 && playlist.title.length >= 10){
            return true
        }else{
            return false
        }
    }


    return (
        <Box
            sx={{
                my: 5,
                mx: 10,
                py: 5,
                backgroundColor: '#111111',
                boxShadow: 2,
                borderRadius: 10,
                textAlign: 'center'
            }}
        >
            <Typography variant='h6'>Create your playlist!</Typography>
            {/* <div className="form-wrapper"> */}
            <Box sx={{
                mt: 5,
                mx: 10,
                textAlign: 'start'
            }}>
                <form onSubmit={() => props.handleSubmit}>

                    <TextField
                        fullWidth
                        name='title'
                        error={props.newPlaylist.title.length <= 10}
                        helperText={(props.newPlaylist.title.length <= 10) ? 'Title must be more than 10 character' : 'Its good'}
                        id="outlined-error"
                        label="New Playlist Title"
                        value={props.newPlaylist.title}
                        onChange={props.handleText}
                    />
                    <TextField
                        fullWidth
                        name='description'
                        label="Playlist Description"
                        value={props.newPlaylist.description}
                        onChange={props.handleText}
                    />
                    <ThemeProvider theme={theme}>
                        <Box sx={{mt: 2}}>
                        <Button
                            variant="contained"
                            color='primary'
                            sx={{ borderRadius: 20, fontSize:10 }}
                            size='small'
                            type='submit'
                            disabled={!validation(props.newPlaylist)}
                        >
                            Create!
                        </Button>
                        <Typography variant='caption' display={validation(props.newPlaylist)?'none': 'inline-block'} color='error' sx={{py:2, ml:2}}>Please select at least 1 track</Typography>
                        </Box>
                    </ThemeProvider>
                </form>
            </Box>
            {/* </div> */}

        </Box>
        // <div className='wrapper'>
        // </div>
    )
}

export default CreatePlaylist;