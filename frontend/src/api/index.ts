import axios from 'axios';

export async function getMerch() {
    const result = await axios.get('https://mr-goose-447tw.ondigitalocean.app/merch');

    return result;
}