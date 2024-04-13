import { Schema, model, models } from "mongoose";

const UserInfoSchema = new Schema({
    email: {type: String, required: true},
    streetAddress: {type: String},
    phone: {type: String},
    city: {type: String},
    admin: {type: Boolean, default: false},
}, {timestamps: true})

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);