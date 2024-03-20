import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:3001',
})

const hughjass = (await ax.get('user/1')).data
const mikehawk = (await ax.get('user/2')).data

const communities = (await ax.get('community')).data

for (let c of communities) {
    c.owner_id = hughjass.id
    const c_json = JSON.stringify(c)
    ax.put(`community/${c.id}`, c_json)
}
