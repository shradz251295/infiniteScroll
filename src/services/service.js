import axios from 'axios';

export function getUserDetails() {
    return axios({
        url: 'https://randomuser.me/api/?seed=${seed}&page=${this.state.}&results=30',
        method: 'GET',
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error
        })
}