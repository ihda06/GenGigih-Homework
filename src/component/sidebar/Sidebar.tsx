import { FC } from 'react';
import './Sidebar.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

type SidebarProps = {
    selectPage: string;
}

const createplaylist = 'createplaylist';
const yourplaylist = 'yourplaylist';


const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {

    const history = useHistory()

    const routing = (link: string)=>{
        if(link === createplaylist){
            history.push(createplaylist)
        }else if(link === yourplaylist){
            history.push(yourplaylist)
        }
    }

    return (
        <Box sx={{ display: { xs: 'none', md: 'block' }, width: 15 / 100, backgroundColor:'black', py:2 }}>
            <Box
                component="img"
                sx={{
                    maxWidth: { xs: 350, md: 50 / 100 },
                }}
                alt="The house from the offer."
                src="white-spotify.png"
            />
            <nav aria-label="main mailbox folders">
                {/* <List >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Login />
                        </ListItemButton>
                    </ListItem>
                </List> */}
                <List sx={{ color: '#ffffffb8' }}>
                    <ListItem disablePadding>
                        <ListItemButton selected={(props.selectPage === createplaylist)} >
                            <ListItemText
                                sx={{ mx: 0 }}
                                primary="Create Playlist"
                                primaryTypographyProps={{
                                    fontSize: 15,
                                    fontWeight: (props.selectPage === createplaylist) ? 800 : 300
                                }}
                                onClick={()=>routing(createplaylist)}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={(props.selectPage === yourplaylist)}>
                            <ListItemText
                                sx={{ mx: 0 }}
                                primary="Your Playlist"
                                primaryTypographyProps={{
                                    fontSize: 15,
                                    fontWeight: props.selectPage === yourplaylist ? 800 : 300
                                }}
                                onClick={()=>routing(yourplaylist)}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}

export default Sidebar;
