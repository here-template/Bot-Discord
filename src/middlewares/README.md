# Middleware Demo

This directory contains middleware examples for the djs-core Discord bot framework. Middlewares are functions that run before interactions are processed by their handlers, allowing you to implement features like:

- **Permission checking**
- **Rate limiting / Cooldowns**
- **Logging and analytics**
- **Input validation**
- **Anti-spam protection**

## Available Middlewares

### 1. Command Middleware (`command.ts`)
- Logs all command usage
- Blocks commands in DMs
- Can be extended for permission checks and cooldowns

### 2. Button Middleware (`button.ts`)
- Logs all button interactions
- Implements permission-based blocking
- Example of admin-only buttons

### 3. Modal Middleware (`modal.ts`)
- Logs all modal submissions
- Provides structure for input validation
- Anti-spam protection framework

### 4. Select Middleware (`select.ts`)
- Logs select menu interactions
- Role-based option filtering
- Selection count validation

## How Middlewares Work

Middlewares are functions that:
1. Receive the interaction object
2. Perform checks/validations
3. Return `true` to allow the interaction to proceed
4. Return `false` to block the interaction

When returning `false`, you should send a response to the user explaining why the interaction was blocked.

## Usage

Middlewares are automatically registered in `index.ts`:

```typescript
import commandMiddleware from "./src/middlewares/command.ts";
// ... other imports

// Register middlewares
client.middlewares.push(commandMiddleware);
```

## Extending Middlewares

You can easily extend these examples by:
- Adding database connections for persistent data
- Implementing Redis for caching and rate limiting
- Adding more sophisticated permission systems
- Creating custom validation logic

## Example Enhancements

- **Database Integration**: Store user cooldowns, permissions, or usage statistics
- **Redis Cache**: Implement distributed rate limiting
- **Role Hierarchy**: Create complex permission systems
- **Audit Logging**: Save interaction logs for moderation
- **Auto-moderation**: Block inappropriate content or spam