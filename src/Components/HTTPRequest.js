import axios from 'axios'

export default async function HTTPRequest(url) {

    return await axios.get(url)
        .then((response) => response.data)
        .catch((error) => console.log(error));
        
}
