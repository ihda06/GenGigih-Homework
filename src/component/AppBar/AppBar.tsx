import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny, shallowEqual, } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Login from '../Login/Login';
import { add, addKeyword } from '../../redux/searchResultSlice';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import { addUser } from '../../redux/userSlice';
import { addUser } from '../../redux/userSlice'

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile'];
type SidebarProps = {
  selectPage: string
}

const ResponsiveAppBar:React.FC<SidebarProps> = (props: SidebarProps) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [input, setInput] = React.useState('')
  const [data, setData] = React.useState<any>(null)
  const token = useSelector((state: RootStateOrAny) => state.token.value);
  const userData = useSelector((state: RootStateOrAny) => state.userData.userinfo);
  
  useEffect(()=>{
    console.log("tes")
    const getData = async()=>{
      try {
        let response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
  
        })
        response = await response
        setData(response.data)
      }
      catch (e) {
        console.error(e)
      }
    }

    getData();
  
  }, [])
  

  const createplaylist = 'createplaylist';
  const yourplaylist = 'yourplaylist';


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEnter = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("masuk")
    e.preventDefault()
    dispatch(addKeyword(input))
    await handleSubmit()
    history.push("/search")
  }

  // const handleSRC= ()=>{
  //   data = data.images[0].url
  //   return toString(data.images[0].url
  // }

  const handleSubmit = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          type: 'track',
          q: input,
          limit: 8
        },
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      console.log(typeof response.data.tracks.items)
      dispatch(add(response.data.tracks.items))
    }
    catch (e) {
      alert("Kamu belum login")
      console.error(e)
    }
  }

  return (

    <AppBar position="static" style={{ margin: 0 }}>
      
      <Container maxWidth="xl">
      
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
              <MenuItem selected>
                <Typography textAlign="center">Create Playlist</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Your Playlist</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
              flexGrow: 1,
              justifyContent: 'start',
              width: 100 / 100,
              display: "flex"
            }}
          >
            <form onSubmit={handleEnter}>
              <TextField 
                id="outlined-basic" 
                // label="Search Track" 
                variant="standard" 
                size='small' 
                placeholder='Search..'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 17 }} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setInput(e.target.value)} />
            </form>
          </Box>
          <Box sx={{ flexGrow: 1, justifyContent: 'end' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* {console.log(data.images[0].url)} */}
                <Avatar alt="Remy Sharp" src='data.images[0].url' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem >
                <Login />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
};
export default ResponsiveAppBar;