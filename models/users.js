import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, required: true },
    profilePicture: { type: String},
    age: { type: String },
    role: { type: String, enum: ['unsubscribed', 'subscribed'], default: 'unsubscribed' },
    createdAt: { type: Date, default: Date.now }
});

// Prevent redefining the model
const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;