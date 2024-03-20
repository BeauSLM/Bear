import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:3001',
})

const users = (await ax.get('user')).data

const hugh = users[0]
const mike = users[1]

const communities = (await ax.get('community')).data
const commId = communities[0].id

for (let comm of communities) {
    comm.owner_id = hugh.id
    await ax.put(`community/${comm.id}`, comm)
}

const section = (await ax.get('community_section')).data[0]

section.community_id = commId

await ax.put(`community_section/${commId}/${section.section_name}`, section)


var thread = {
    community_id: commId,
    user_id: mike.id,
    section: section.section_name,
    title: "I got a Miata",
    content: "The Miata would outclass any car or truck.",
    views: 17,
}

thread = await ax.post('thread', thread)

thread = (await ax.get("thread")).data[0]

const reply = {
    thread_id: thread.thread_id,
    user_id: hugh.id,
    content: "Don't think your Miata would do anything against my 2006 F-150.",
};

await ax.post("reply", reply)
