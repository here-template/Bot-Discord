import { ModalMiddleware } from "djs-core";

export default new ModalMiddleware()
.run(async (interaction) => {
    // Example: Log all modal submissions
    console.log(`📝 Modal Middleware: ${interaction.user.tag} submitted modal "${interaction.customId}"`);
    
    // Example: Validate modal inputs
    const fields = interaction.fields;
    
    // Check if any field is empty (basic validation)
    let hasEmptyFields = false;
    try {
        // This is just an example - in reality you'd check specific field IDs
        if (fields.getTextInputValue) {
            // Add your validation logic here
        }
    } catch (error) {
        // Field validation logic
    }
    
    // Example: Block modals submitted too quickly (anti-spam)
    // In a real implementation, you'd track submission times
    console.log(`✅ Modal submission allowed for ${interaction.user.tag}`);
    
    return true; // Allow the modal submission to proceed
});