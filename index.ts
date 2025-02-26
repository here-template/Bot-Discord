import {BotClient} from 'djs-core';
import {config} from 'dotenv';
config();
const zzzz = new BotClient();
zzzz.start(process.env.TOKEN);
import a from "./src/config.ts";
import b from "./src/events/ready.ts";
import c from "./src/interactions/buttons/demo.ts";
import d from "./src/interactions/commands/utils/handler/button.ts";
import e from "./src/interactions/commands/utils/handler.ts";
import f from "./src/interactions/commands/utils/ping.ts";
export {
a,
b,
c,
d,
e,
f,
};
