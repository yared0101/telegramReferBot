const helpMessage = `
Welcome to refer me bot
use the commands below
/start to start
/getlink to get referal links
/refercount to get referred people count
`;
const getReferalLink = (uniqueNumber) =>
    `https://t.me/${process.env.BOT_USERNAME}?start=${uniqueNumber}`;
module.exports = {
    helpMessage,
    getReferalLink,
};
