const { Sequelize, QueryTypes } = require("sequelize");
const { getReferalLink } = require("../../config");
module.exports = (bot) => {
    bot.command("getlink", async (ctx) => {
        const sequelize = new Sequelize("refermebot", "root", "", {
            host: "localhost",
            dialect: "mariadb",
        });
        try {
            await sequelize.authenticate();

            const queryResult = await sequelize.query(
                "SELECT referal_link FROM users WHERE user_id = ?",
                {
                    replacements: [ctx.chat.id],
                    type: QueryTypes.SELECT,
                }
            );
            let referal_no;
            if (queryResult.length == 0) {
                const results = await sequelize.query(
                    "INSERT INTO users(username, user_id, referred_people) VALUES(:username,:user_id,0)",
                    {
                        replacements: {
                            username: ctx.chat.username,
                            user_id: ctx.chat.id,
                        },
                        type: QueryTypes.INSERT,
                    }
                );
                referal_no = results[0];
            } else {
                referal_no = queryResult[0].referal_link;
            }
            ctx.reply(
                `Share this link with users and win a prize\n${getReferalLink(
                    referal_no
                )}`
            );
        } catch (error) {
            console.log(error);
            ctx.reply("Some error happened");
        } finally {
            sequelize.close();
        }
    });
};
