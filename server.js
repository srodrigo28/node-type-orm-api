import { createServer } from 'node:http'

const server = createServer( (request, response) => {
    console.log('oi')
    response.write('oi')

    return response.end()
})

server.listen(3333)