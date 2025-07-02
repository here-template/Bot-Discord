import { CommandMiddleware } from "djs-core";

// Simple in-memory store for demo purposes
// In production, use Redis or a database
const userCooldowns = new Map<string, number>();
const COOLDOWN_DURATION = 5000; // 5 seconds

export default new CommandMiddleware()
.run(async (interaction) => {
    const userId = interaction.user.id;
    const commandName = interaction.commandName;
    const now = Date.now();
    
    // Check if user is on cooldown
    const userCooldownKey = `${userId}-${commandName}`;
    const lastUsed = userCooldowns.get(userCooldownKey);
    
    if (lastUsed && (now - lastUsed) < COOLDOWN_DURATION) {
        const timeLeft = Math.ceil((COOLDOWN_DURATION - (now - lastUsed)) / 1000);
        
        await interaction.reply({
            content: `⏱️ Please wait ${timeLeft} seconds before using this command again.`,
            ephemeral: true
        });
        
        console.log(`🚫 Cooldown: ${interaction.user.tag} tried to use /${commandName} too quickly`);
        return false; // Block the command
    }
    
    // Set cooldown for this user-command combination
    userCooldowns.set(userCooldownKey, now);
    
    // Clean up old entries periodically (basic cleanup)
    if (userCooldowns.size > 1000) {
        const cutoff = now - COOLDOWN_DURATION * 2;
        for (const [key, timestamp] of userCooldowns.entries()) {
            if (timestamp < cutoff) {
                userCooldowns.delete(key);
            }
        }
    }
    
    console.log(`✅ Cooldown passed for ${interaction.user.tag} using /${commandName}`);
    return true; // Allow the command to proceed
});