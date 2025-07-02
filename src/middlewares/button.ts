import { ButtonMiddleware } from "djs-core";

export default new ButtonMiddleware()
.run(async (interaction) => {
    // Example: Log all button interactions
    console.log(`🔘 Button Middleware: ${interaction.user.tag} clicked button "${interaction.customId}"`);
    
    // Example: Block certain buttons for specific users
    if (interaction.customId === "admin-only" && !interaction.memberPermissions?.has("Administrator")) {
        await interaction.reply({
            content: "❌ You need administrator permissions to use this button!",
            ephemeral: true
        });
        return false; // Block the button interaction
    }
    
    // Example: Rate limiting for buttons (simple demo)
    // In a real implementation, you'd track this in a database or cache
    console.log(`✅ Button interaction allowed for ${interaction.user.tag}`);
    
    return true; // Allow the button interaction to proceed
});