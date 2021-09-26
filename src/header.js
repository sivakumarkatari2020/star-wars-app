import React from 'react';
import {Box,InputBase,Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import bgImg from './images/star-wars-backgrounds-1.jpg';

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
        alignItems: 'center',
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
    search: {
        width: '90%',
        maxWidth: '500px',
        background: '#FFF',
        padding: '10px',
        borderRadius: '10px',
        border: '4px solid rgba(0,0,0,0.15)',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconWrapper: {
        width: '20%',
        color: '#000',
    },
    inputBox: {
        width: '80%',
    }
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
                    <Box className={styles.search}>
                        <Box className={styles.iconWrapper}>
                            <SearchIcon />
                        </Box>
                        <InputBase
                            className={styles.inputBox}
                            placeholder="Search any charecter name..."
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Header
