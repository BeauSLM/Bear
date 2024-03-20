import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:3001',
})

const users = (await ax.get('user')).data

const communities = (await ax.get('community')).data

const hugh = users[0]
const mike = users[1]

for (let c of communities) {
    c.owner_id = hugh.id
    console.log(c)
    ax.put(`community/${c.id}`, c)
}
