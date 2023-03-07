import { Application } from "express";
import Player from "./Database/Player";

export default (app : Application) => {

    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.post("/getPlayer", async (req, res) => {

        const { username } = req.body;

        if (!username) return res.status(400).json({ error : "Missing username" });

        const player = await Player.GetPlayer(username, true);

        res.set({
            'Content-Type': 'text/plain'
        });
        return res.json(player);
    });

    app.post("/setPlayer", async (req, res) => {

        const { player } = req.body;

        if (!player) return res.status(400).json({ error : "Missing player" });

        const updatedPlayer = await Player.UpdatePlayer(player);

        return res.json(updatedPlayer);
    });

};