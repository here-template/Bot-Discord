import { CommandMiddleware } from "djs-core";

export default new CommandMiddleware()
.run(async (interaction) => {
    // Example: Check if user has permission to use commands
    console.log(`🔍 Command Middleware: ${interaction.user.tag} used /${interaction.commandName}`);
    
    // Example: Block commands in DM
    if (!interaction.guild) {
        await interaction.reply({
            content: "❌ Commands are not allowed in DMs!",
            ephemeral: true
        });
        return false; // Block the command
    }
    
    // Example: Simple cooldown check (in a real implementation, you'd use a database or cache)
    // For demo purposes, we'll just log and allow all commands
    console.log(`✅ Command allowed for ${interaction.user.tag}`);
    
    return true; // Allow the command to proceed
});