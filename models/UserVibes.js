import mongoose, { Schema } from "mongoose";

const DarkTruth = new Schema({
    yourStoryTitle: { type:String, required:true},
    chroniclesOfYou: { type: String, required: true, unique: true },
    replyAllowed: { type: Boolean, required: true },
    emailAllowed: { type: Boolean, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: { type: Date, default: Date.now}
})

const UserVibesModel = mongoose.models.DarkTruth || mongoose.model("DarkTruth", DarkTruth);

export default UserVibesModel;