import { Schema } from "mongoose";
import db from "../Db";

const playerSchema = new Schema({
    username : String,
    permissions : [String],
    roles : [String],
    isBanned : Boolean,
    isMuted : Boolean,
    isVip : Boolean,
    vipExpiration : Date,
    lastLogin : Date
});

export default db.model("player", playerSchema);