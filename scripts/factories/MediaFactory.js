import Image from '../models/Image.js'
import Video from '../models/Video.js'

//Choisit si une image ou une video doit être affiché en fonction des data reçues
export default class MediaFactory {
    constructor(data) {
        if(data.image){
            return new Image(data)
        } else {
            return new Video(data)
        }
    }
}