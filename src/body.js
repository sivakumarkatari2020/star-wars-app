import React from 'react';
import { useHistory } from "react-router-dom";
import {Box,Grid,Typography,CircularProgress} from '@mui/material';
import {makeStyles} from '@mui/styles';
import bgImg from './images/star-wars-backgrounds-3.jpg';
import getPeopleAPI from './api/getPeople';
import getSearchedPeopleAPI from './api/getSearchedPeople';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const useStyles = makeStyles({
    body: {
        width: '100%',
        height: 'auto',
        minHeight: '400px',
        background: `url(${bgImg})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridContainer: {
        padding: '2rem',
    },
    card: {
        width: '250px',
        height: '200px',
        background: '#262626',
        borderRadius: '5px',
        padding: '0.5rem',
        cursor: 'pointer',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',

        '@media (max-width:500px)': {
            width: '90%',
            minWidth: '320px',
        },

        "&:hover" : {
            transform: 'scale(1.05)',

            "& $directIcon": {
                color: "#1ad1ff"
            }
        }
    },
    heading: {
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    directIcon: {
        color: '#FFF',
    },
    separator: {
        height: '30%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    names: {
        color: '#b3b3b3',
    },
    films:{
        color: '#808080',
    },
    paginator: {
        width: '350px',
        height: '50px',
        color: "#000",
        background: "#262626",
        padding: '1rem .5rem',
        margin: '2rem 0',

        borderRadius: '5px',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paginationItem: {
        width: '30px',
        height: '30px',
        padding: 0,
        border: '1px solid #FFF',
        borderRadius: '50%',
        color: '#FFF',
        cursor: 'pointer',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        "&:hover" : {
            background: '#FFF',
            color: '#000',
        }
    },
    paginationActive: {
        width: '30px',
        height: '30px',
        padding: 0,
        border: '1px solid #FFF',
        borderRadius: '50%',
        color: '#000',
        background: '#FFF',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        "&:hover" : {
            background: '#FFF',
            color: '#000',
        }
    },
})

function Body(props) {

    const history = useHistory();


    const {searchName} = props;
    const styles = useStyles();

    const [data,setData] = React.useState([]);
    const [isData,setIsData] = React.useState(false);
    const [isFound,setFound] = React.useState(true);

    React.useEffect(()=>{
        setIsData(false);
        if(searchName.length > 0){
            (async()=>{
                let apiData = await getSearchedPeopleAPI(searchName);
                setData(apiData);
                if(apiData.count>0){
                    setIsData(true);
                    setFound(true);
                }
                else if(apiData.count === 0){
                    setIsData(true);
                    setFound(false);
                }
            })()
        }else{
            (async()=>{
                let apiData = await getPeopleAPI('https://swapi.dev/api/people');
                setData(apiData);
                if(apiData.count>0){
                    setIsData(true);
                    setFound(true);
                }
                else if(apiData.count === 0){
                    setIsData(true);
                    setFound(false);
                }
            })()
        }
    },[searchName])

    const pageChange = (pageVal) => {
        setIsData(false);
        (async()=>{
            let url = `https://swapi.dev/api/people/?page=${pageVal}`;
            let apiData = await getPeopleAPI(url);
            setData(apiData);
            if(apiData.count){
                setIsData(true);
            }
        })(pageVal)
    }

    const reDirect = (name) => {
        history.push(`/charecter/${name}`);
    }

    return (
        <Box className={styles.body}>
            {
                isData 
                ? 
                    isFound
                    ? <>
                        <Grid container spacing={3} className={styles.gridContainer}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={4}>
                                    {data.results.map((item) => (
                                        <Grid key={item.name} item>
                                            <Box className={styles.card} onClick={()=>reDirect(item.name)}>
                                                <Box className={styles.heading}>
                                                    <Typography variant='h5' className={styles.names}>{item.name}</Typography>
                                                    <ArrowRightIcon className={styles.directIcon}/>
                                                </Box>
                                                <Box className={styles.separator}>
                                                    <Typography variant='subtitle' className={styles.films}>Birth Year : {item.birth_year}</Typography>
                                                    <Typography variant='subtitle' className={styles.films}>No of Films : {item.films.length}</Typography>
                                                    {/*<Typography variant='subtitle' className={styles.films}>No   of Starships : {item.starships.length}</Typography>*/}
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            Math.ceil(data.count / 10) > 1
                            ? <Box className={styles.paginator}>
                                <Box color="primary" 
                                    className={styles.paginationItem}
                                    onClick={(e)=>{
                                        pageChange(1);
                                    }}>1</Box>
                                <Box color="primary" 
                                    className={styles.paginationItem}
                                    onClick={(e)=>{
                                        pageChange(2);
                                    }}>2</Box>
                                <Box color="primary" 
                                    className={styles.paginationItem}
                                    onClick={()=>{
                                        pageChange(3);
                                    }}>3</Box>
                                <Box color="primary" 
                                    className={styles.paginationItem}
                                    onClick={()=>{
                                        pageChange(4);
                                    }}>4</Box>
                                <Box color="primary" 
                                    className={styles.paginationItem}
                                    onClick={()=>{
                                        pageChange(5);
                                    }}>5</Box>
                                <Box color="primary" 
                                    className={styles.paginationItem}
                                    onClick={()=>{
                                        pageChange(6);
                                    }}>6</Box>
                                <Box color="primary" 
                                    className={styles.paginationItem}
                                    onClick={()=>{
                                        pageChange(7);
                                    }}>7</Box>
                                <Box color="primary" 
                                    className={styles.paginationItem}
                                    onClick={()=>{
                                        pageChange(8);
                                    }}>8</Box>
                                <Box color="primary" 
                                    className={styles.paginationItem}
                                    onClick={()=>{
                                        pageChange(9);
                                    }}>9</Box>
                            </Box>
                            : ''
                        }
                    </>
                    : <Typography variant='h5' className={styles.names}>Data Not Found</Typography>
                : <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }
        </Box>
    )
}

export default Body
