import axios from 'axios';

const PROXY_URL = 'https://postwoman.apollosoftware.xyz';

function proxyRequest({method, url, auth, headers = {}}) {
    return axios
        .post(PROXY_URL, {
            method,
            url,
            headers,
            ...auth && {
                credentials: true,
                auth,
            },
        })
        .then(response => response.data) // axios data
        .then(proxyResponse => proxyResponse.data); // proxy data
}

export function fetchSigfoxMessages() {
    return proxyRequest({
        method: 'GET',
        url: 'https://api.sigfox.com/v2/devices/24DA67/messages?limit=5',
        auth: {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password'),
        },
      })
      .then(sigfoxResponse => sigfoxResponse.data) // sigfox data
}