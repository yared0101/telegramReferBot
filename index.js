require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TOKEN);

const startCommand = require("./src/commands/start");
startCommand(bot);

const helpCommand = require("./src/commands/help");
helpCommand(bot);

const getlinkCommand = require("./src/commands/getlink");
getlinkCommand(bot);

const refercountCommand = require("./src/commands/refercount");
refercountCommand(bot);

console.log("bot started");
bot.launch();
