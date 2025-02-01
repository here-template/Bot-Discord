import { Events } from "discord.js";
import { EventListner } from "djs-core";

export default new EventListner()
.setEvent(Events.ClientReady)
.run((client) => {
    console.log("This is a event handler demo, your bot is ready!");
});