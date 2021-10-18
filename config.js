const helpMessage = `
Welcome to search bot
use the inline mode below
@sea_wiki_bot p <search image>
@sea_wiki_bot w <search wiki>
`;
const getReferalLink = (uniqueNumber) =>
    `https://t.me/${process.env.BOT_USERNAME}?start=${uniqueNumber}`;
module.exports = {
    helpMessage,
    getReferalLink,
};
