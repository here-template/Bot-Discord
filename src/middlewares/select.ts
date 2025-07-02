import { SelectMiddleware } from "djs-core";

export default new SelectMiddleware()
.run(async (interaction) => {
    // Example: Log all select menu interactions
    console.log(`📋 Select Middleware: ${interaction.user.tag} used select menu "${interaction.customId}"`);
    console.log(`   Selected values: ${interaction.values.join(", ")}`);
    
    // Example: Limit selections based on user roles
    if (interaction.values.includes("admin-option") && !interaction.memberPermissions?.has("Administrator")) {
        await interaction.reply({
            content: "❌ You don't have permission to select this option!",
            ephemeral: true
        });
        return false; // Block the select interaction
    }
    
    // Example: Validate number of selections
    if (interaction.values.length > 3) {
        await interaction.reply({
            content: "❌ You can only select up to 3 options!",
            ephemeral: true
        });
        return false; // Block if too many selections
    }
    
    console.log(`✅ Select menu interaction allowed for ${interaction.user.tag}`);
    
    return true; // Allow the select interaction to proceed
});