import React from 'react';
import {Box,InputBase,Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import bgImg from './images/star-wars-backgrounds-1.jpg';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.9),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '300px',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#000',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        border: '4px solid rgba(0,0,0,0.15)',
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '300px',
            '&:focus': {
                //border: '4px solid rgba(0,0,0,0.3)',
                
            },
        },
    },
}));

const useStyles = makeStyles({
    header: {
        width: '100%',
        height: '30%',
        minHeight: '300px',
        background: `url(${bgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    innerComp: {
        width: '90%',
        height: '90%',
        minHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',

        '@media (max-width:500px)': {
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
    },
    logoHandler: {
        width: '70%',
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchField: {
        width: '90%',
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function Header(props) {

    const {setSearch} = props;
    const styles = useStyles();

    return (
        <Box className={styles.header}>
            <Box className={styles.innerComp}>
                <Box className={styles.logoHandler}>
                    <Typography variant="h2">STAR</Typography>
                    <Typography variant="h2">WARS</Typography>
                    <Typography variant="h5">characters</Typography>
                </Box>
                <Box className={styles.searchField}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search any charecter name..."
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                    </Search>
                </Box>
            </Box>
        </Box>
    )
}

export default Header
