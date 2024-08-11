import { randomUUID } from "node:crypto"

export class DatabaseMemory{
    // #videos = [] // set, map
    #videos = new Map()

    list1(){
        return Array.from(this.#videos.values())
    }
    list2(){
        return Array.from(this.#videos.entries())
    }
    list3(){
        return Array.from(this.#videos.entries()).map( (item) => {
            const id = item[0]
            const title = item[1]
            const description = item[2]
            const duration = item[3]

            return { id, title, description, duration}
        })
    }
    list(){
        return Array.from(this.#videos.entries()).map( (item) => {
            const id = item[0]
            const data = item[1]

            return { id, ...data}
        })
    }
    list5(){
        return Array.from(this.#videos.entries())
            .map( (item) => {

            const id = item[0]
            const data = item[1]

            return { id, ...data }

            })
            .filter( itemFilter => {
                if( search ){
                    return itemFilter.title.includes(search)
                }
                return true
            })
    }

    create(video){
        // this.#videos.push(video)
        const videoId = randomUUID()
        
        this.#videos.set( videoId, video )
    }
    update(id, video){
        this.#videos.set(id, video)
    }
    delete(id){
        this.#videos.delete(id)
    }
}