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
                const referal_link = Math.floor(Math.random() * 10000000);
                console.log(ctx.chat.username);
                await sequelize.query(
                    "INSERT INTO users(username, user_id, referred_people,referal_link) VALUES(:username,:user_id,0,:referal_link)",
                    {
                        replacements: {
                            username: ctx.chat.username || "an",
                            user_id: ctx.chat.id,
                            referal_link,
                        },
                        type: QueryTypes.INSERT,
                    }
                );
                referal_no = referal_link;
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
