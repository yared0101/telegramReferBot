const config = require("../../config");
const { Sequelize, QueryTypes } = require("sequelize");
module.exports = (bot) => {
    bot.command("start", async (ctx) => {
        const sequelize = new Sequelize("refermebot", "root", "", {
            host: "localhost",
            dialect: "mariadb",
        });
        const refer_no = ctx.message.text.split(" ")[1];
        try {
            const queryResult = await sequelize.query(
                "SELECT * FROM started_users WHERE user_id = ?",
                {
                    replacements: [ctx.chat.id],
                    type: QueryTypes.SELECT,
                }
            );
            if (queryResult.length == 0) {
                await sequelize.query(
                    "INSERT INTO started_users(user_id) VALUES(?)",
                    {
                        replacements: [ctx.chat.id],
                        type: QueryTypes.INSERT,
                    }
                );
                if (refer_no) {
                    await sequelize.query(
                        "UPDATE users SET referred_people=referred_people+1 WHERE referal_link=?",
                        {
                            replacements: [refer_no],
                            type: QueryTypes.UPDATE,
                        }
                    );
                    const queryResult = await sequelize.query(
                        "SELECT user_id, username FROM users WHERE referal_link=?",
                        {
                            replacements: [refer_no],
                            type: QueryTypes.SELECT,
                        }
                    );
                    const referer = queryResult[0].user_id;
                    const referer_username = queryResult[0].username;
                    bot.telegram.sendMessage(
                        referer,
                        `@${ctx.chat.username} has joined because of your refer, please see /refercount to see how many people joined because of you`
                    );
                    await ctx.reply(
                        `You have been invited by @${referer_username}`
                    );
                }
                ctx.reply(config.helpMessage);
            } else {
                ctx.reply("hey ✌");
            }
        } catch (e) {
            console.log(e);
            ctx.reply("some error happened");
        } finally {
            sequelize.close();
        }
    });
};
