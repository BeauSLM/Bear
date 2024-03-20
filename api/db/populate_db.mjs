import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:3001',
})

const users = (await ax.get('user')).data

const communities = (await ax.get('community')).data

const hugh = users[0]
const mike = users[1]

for (let comm of communities) {
    comm.owner_id = hugh.id
    await ax.put(`community/${comm.id}`, comm)
}


