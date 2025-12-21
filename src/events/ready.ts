import { EventLister } from "@djs-core/runtime";
import { ActivityType, Events } from "discord.js";

export default new EventLister()
	.event(Events.ClientReady)
	.run(async (client) => {
		return client.user.setActivity({
			name: "djs-core <3",
			type: ActivityType.Custom,
		});
	});
