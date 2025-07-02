import { CommandMiddleware, ButtonMiddleware } from "djs-core";

// Example: Advanced permission system middleware
const advancedPermissionMiddleware = new CommandMiddleware()
.run(async (interaction) => {
    // Example: Block certain commands for users with specific roles
    const blockedRoles = ["Muted", "Timeout", "Restricted"];
    const userRoles = interaction.member?.roles.cache.map(role => role.name) || [];
    
    const hasBlockedRole = blockedRoles.some(role => userRoles.includes(role));
    
    if (hasBlockedRole) {
        await interaction.reply({
            content: "❌ You cannot use commands while you have a restricted role.",
            ephemeral: true
        });
        return false;
    }
    
    // Example: Maintenance mode
    const maintenanceMode = false; // This could come from a database or config
    if (maintenanceMode && !interaction.memberPermissions?.has("Administrator")) {
        await interaction.reply({
            content: "🔧 The bot is currently in maintenance mode. Please try again later.",
            ephemeral: true
        });
        return false;
    }
    
    return true;
});

// Example: Anti-spam button middleware
const antiSpamButtonMiddleware = new ButtonMiddleware()
.run(async (interaction) => {
    // Simple anti-spam: check if user clicked too many buttons recently
    const userId = interaction.user.id;
    const now = Date.now();
    
    // In a real implementation, you'd use Redis or a database
    // This is just for demonstration
    if (!global.buttonClickTracker) {
        global.buttonClickTracker = new Map();
    }
    
    const userClicks = global.buttonClickTracker.get(userId) || [];
    
    // Remove clicks older than 30 seconds
    const recentClicks = userClicks.filter(timestamp => (now - timestamp) < 30000);
    
    // Allow maximum 10 button clicks per 30 seconds
    if (recentClicks.length >= 10) {
        await interaction.reply({
            content: "⏱️ You're clicking buttons too quickly! Please wait a moment.",
            ephemeral: true
        });
        return false;
    }
    
    // Add this click to the tracker
    recentClicks.push(now);
    global.buttonClickTracker.set(userId, recentClicks);
    
    return true;
});

export {
    advancedPermissionMiddleware,
    antiSpamButtonMiddleware
};