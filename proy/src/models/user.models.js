import {Schema, model} from 'mongoose'

const userSchema = new Schema( {
    username: String,
    email: {
        type: String, 
        unique: true 
    }
})
                            //npmbre y userriologie
export const userModel = model("users", userSchema)