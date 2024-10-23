import { FoxyClient } from "../../../structures/types/FoxyClient";
import { MessageFlags } from "../../../utils/discord/Message";
import { logger } from "../../../utils/logger";
import UnleashedCommandExecutor from "../../structures/UnleashedCommandExecutor";

export default class ValorantVerifyExecutor {
    async execute(
        bot: FoxyClient,
        context: UnleashedCommandExecutor,
        endCommand: () => void,
        t
    ) {
        const code = context.getOption<string>('authcode', false);
        const authCode = await bot.database.getCode(code);

        if (!authCode) {
            return context.sendReply({
                content: context.makeReply(bot.emotes.FOXY_CRY, t('commands:valorant.verify.noAuthCode')),
                flags: MessageFlags.EPHEMERAL,
            }) && endCommand();
        }

        const userData = await bot.database.getUser(context.author.id);

        if (userData.riotAccount?.isLinked) {
            return context.sendReply({
                content: context.makeReply(bot.emotes.FOXY_CRY, t('commands:valorant.verify.alreadyLinked')),
                flags: MessageFlags.EPHEMERAL,
            }) && endCommand();
        }

        try {
            userData.riotAccount = {
                isLinked: true,
                puuid: authCode.puuid,
                isPrivate: true,
                region: null,
            };

            await userData.save();

            return context.sendReply({
                content: context.makeReply(bot.emotes.FOXY_NICE, t('commands:valorant.verify.success')),
                flags: MessageFlags.EPHEMERAL,
            }) && endCommand();
        } catch (error) {
            logger.error(error);
            return context.sendReply({
                content: context.makeReply(bot.emotes.FOXY_CRY, t('commands:valorant.verify.error')),
                flags: MessageFlags.EPHEMERAL,
            }) && endCommand();
        }
    }
}