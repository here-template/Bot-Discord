import { EventListener } from "@djs-core/runtime";
import { ActivityType, Events } from "discord.js";

export default new EventListener()
	.event(Events.ClientReady)
	.run(async (client) => {
		return client.user.setActivity({
			name: "djs-core <3",
			type: ActivityType.Custom,
		});
	});
