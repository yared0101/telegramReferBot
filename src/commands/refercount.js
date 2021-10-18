const { Sequelize, QueryTypes } = require("sequelize");
const { getReferalLink } = require("../../config");
module.exports = (bot) => {
    bot.command("refercount", async (ctx) => {
        const sequelize = new Sequelize("refermebot", "root", "", {
            host: "localhost",
            dialect: "mariadb",
        });
        try {
            await sequelize.authenticate();

            const queryResult = await sequelize.query(
                "SELECT referred_people FROM users WHERE user_id = ?",
                {
                    replacements: [ctx.chat.id],
                    type: QueryTypes.SELECT,
                }
            );
            const count = queryResult[0].referred_people;
            ctx.reply(`you have invited ${count} people`);
        } catch (error) {
            console.log(error);
            ctx.reply("Some error happened");
        } finally {
            sequelize.close();
        }
    });
};
