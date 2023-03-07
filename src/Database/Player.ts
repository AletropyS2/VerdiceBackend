import { Document } from "mongoose";
import PlayerModel from "./Models/PlayerModel";

interface PlayerData
{
    username : string;
    permissions : string[];
    roles : string[];
    isBanned : boolean;
    isMuted : boolean;
    isVip : boolean;
    vipExpiration : Date;
    lastLogin : Date;
}

export default class Player
{
    public static async GetPlayer(username : string, createIfNotPresent = false) : Promise<PlayerData | undefined>
    {
        const player = await PlayerModel.findOne({ username : username });

        if(!player && !createIfNotPresent) return undefined;

        if(!player) return this.CreatePlayer({
            username: username,
            roles: [],
            permissions: [],
            isBanned: false,
            isMuted: false,
            isVip: false,
            vipExpiration: new Date(),
            lastLogin: new Date()
        });

        return {
            username: player.username,
            roles: player.roles,
            permissions: player.permissions,
            isBanned: player.isBanned,
            isMuted: player.isMuted,
            isVip: player.isVip,
            vipExpiration: player.vipExpiration,
            lastLogin: player.lastLogin
        };
    }

    public static async UpdatePlayer(playerData : PlayerData) : Promise<PlayerData>
    {
        const player = await PlayerModel.findOne({ username : playerData.username });

        if(!player)
            return this.CreatePlayer(playerData);

        player.roles = playerData.roles;
        player.permissions = playerData.permissions;
        player.isBanned = playerData.isBanned;
        player.isMuted = playerData.isMuted;
        player.isVip = playerData.isVip;
        player.vipExpiration = playerData.vipExpiration;
        player.lastLogin = playerData.lastLogin;
        
        await player.save();

        return playerData;
    }

    public static async CreatePlayer(playerData : PlayerData) : Promise<PlayerData>
    {
        const player = new PlayerModel(playerData);

        await player.save();

        return playerData;
    }
}