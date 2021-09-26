import axios from "axios";

const getPeopleAPI = async (url) => {
    return axios.get(url)
    .then((result)=>{
        return result.data
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default getPeopleAPI;