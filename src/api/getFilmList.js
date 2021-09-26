import axios from "axios";

const getFilmlistAPI = async (url) => {
    return axios.get(url)
    .then((result)=>{
        let obj = {
            title : result.data.title,
            director: result.data.director,
            release_date: result.data.release_date
        }
        return obj;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getFilmlistAPI;