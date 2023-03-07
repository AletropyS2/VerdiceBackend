import express from "express";
import { writeFileSync, appendFileSync } from "fs"
import Routes from "./Routes";
import { config } from "dotenv";
import db, { Init } from "./Database/Db";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


(async () => {
    await Init();
    Routes(app);
    
    app.listen(process.env.PORT, () => {
        console.clear();
        console.log("Server is running on port 8000");
    });
})();