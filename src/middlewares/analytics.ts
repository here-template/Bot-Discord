import { CommandMiddleware } from "djs-core";

// Analytics and logging middleware
const interactionStats = {
    totalCommands: 0,
    userStats: new Map<string, number>(),
    commandStats: new Map<string, number>(),
    guildStats: new Map<string, number>()
};

export default new CommandMiddleware()
.run(async (interaction) => {
    const userId = interaction.user.id;
    const commandName = interaction.commandName;
    const guildId = interaction.guild?.id || 'DM';
    
    // Update statistics
    interactionStats.totalCommands++;
    
    // User stats
    const userCount = interactionStats.userStats.get(userId) || 0;
    interactionStats.userStats.set(userId, userCount + 1);
    
    // Command stats
    const commandCount = interactionStats.commandStats.get(commandName) || 0;
    interactionStats.commandStats.set(commandName, commandCount + 1);
    
    // Guild stats
    const guildCount = interactionStats.guildStats.get(guildId) || 0;
    interactionStats.guildStats.set(guildId, guildCount + 1);
    
    // Detailed logging
    console.log(`📊 Analytics Middleware:`);
    console.log(`   User: ${interaction.user.tag} (${userId})`);
    console.log(`   Command: /${commandName}`);
    console.log(`   Guild: ${interaction.guild?.name || 'DM'} (${guildId})`);
    console.log(`   Total Commands Today: ${interactionStats.totalCommands}`);
    console.log(`   User's Command Count: ${interactionStats.userStats.get(userId)}`);
    console.log(`   Command Usage Count: ${interactionStats.commandStats.get(commandName)}`);
    
    // Log popular commands periodically
    if (interactionStats.totalCommands % 10 === 0) {
        console.log(`🔥 Popular Commands:`);
        const sortedCommands = Array.from(interactionStats.commandStats.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
        
        sortedCommands.forEach(([cmd, count], index) => {
            console.log(`   ${index + 1}. /${cmd}: ${count} uses`);
        });
    }
    
    // Always allow the command to proceed (this is just for logging)
    return true;
});