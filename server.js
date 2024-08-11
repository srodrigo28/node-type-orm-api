/* 1
import { createServer } from 'node:http'

const server = createServer( (request, response) => {
    console.log('oi')
    response.write('oi')

    return response.end()
})

server.listen(3333)
npm i fastify
*/

import { fastify } from "fastify";
import { DatabaseMemory } from "./DatabaseMemory.js"

const server = fastify()
const database = new DatabaseMemory()

    server.post('/videos', (request, reply) => {
        const { title, description, duration } = request.body

        database.create({
            title,
            description,
            duration
        })

        return reply.status(201).send()
    })
    server.get('/', () => {
        const videos = database.list()

        console.log(videos)
        return videos
    })
    server.get('/videos', (request) => { // listagem com filtro
        const search = request.query.search

        const videos = database.list(search)

        return videos
    })
    server.put('/videos/:id', (request, replay) => {
        const videoId = request.params.id
        const { title, description, duration } = request.body

        database.update(videoId, {
            title, description, duration
        })
        return replay.status(204).send()
    })
    server.delete('/videos/:id', (request, replay) => {
        const videoId = request.params.id

        database.delete(videoId)
        return replay.status(204).send()
    })

server.listen({ port: 8080 })