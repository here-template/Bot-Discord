const {exec,spawn} = require('child_process');
const {promisify} = require('util');
const path = require('path');

const {describe, test, expect, beforeAll,done} = require('@jest/globals');

const execAsync = promisify(exec);

describe('Build and run script', () => {
    beforeAll(async () => {
        await execAsync('npm run build');
        await execAsync('npm i');
    }, 30000);

    test('should log "coucou" when running dist/index.js', async () => {
        const scriptPath = path.resolve(__dirname, '../dist/index.js');
        const child = spawn('node', [scriptPath]);

        let output = '';

        // Écouter les données de stdout
        child.stdout.on('data', (data) => {
            output += data.toString();

            if (output.includes('connecté')) {
                expect(output).toContain('connecté');
                child.kill();
                done();
            }
        });

        child.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        child.on('close', (code) => {
            console.log(`Process exited with code ${code}`);
            if (!output.includes('coucou')) {
                done.fail('Output did not contain "coucou" before process closed');
            }
        });
    }, 30000);
});
