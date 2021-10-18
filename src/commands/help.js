const config = require("../../config");
module.exports = (bot) => {
    bot.command("help", (ctx) => {
        ctx.reply(config.helpMessage);
    });
};
