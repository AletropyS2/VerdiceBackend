import mongoose, { Mongoose } from "mongoose";

let connected = false;

async function Init()
{
    if(connected) return;
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "verdice"
    });
    connected = true;
}

export {
    Init
};

export default mongoose.connection;