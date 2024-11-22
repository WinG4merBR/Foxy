import { Bot } from "discordeno";
import { bot } from "../FoxyLauncher";
import { logger } from "../../../../common/utils/logger";

const setGuildDeleteEvent = async (_: Bot, guild: bigint): Promise<void> => {
    const guildData = bot.database.getGuild(guild);
    
    if (guildData) {
        logger.info(`[GUILD_DELETE] I've been removed from guild: ${guild}`);
    }
}

export { setGuildDeleteEvent }