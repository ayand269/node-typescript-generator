#!/usr/bin/env node
const fs = require('fs-extra');
const { execSync } = require('child_process');
const minimist = require('minimist');

let allPackages = [
    "@types/express",
    "dotenv",
    "express",
    "http-errors",
    "jsonwebtoken",
    "mongoose",
    "morgan",
    "node-input-validator",
    "password-hash"
]

let devDependencies = [
    "@swc-node/core",
    "@swc-node/register",
    "@types/cookie-parser",
    "@types/jsonwebtoken",
    "@types/morgan",
    "@types/node",
    "@types/password-hash",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint",
    "eslint-config-standard-with-typescript",
    "eslint-plugin-import",
    "eslint-plugin-n",
    "eslint-plugin-promise",
    "nodemon",
    "ts-node",
    "typescript"
]

function addLineToAFile(filePath, replaceBy, replaceWith) {
    let data = fs.readFileSync(filePath, 'utf8')

    const updatedContent = data.replace(replaceBy, replaceWith)
    fs.writeFileSync(filePath, updatedContent, 'utf8')
}

// Parse command-line arguments using minimist
const argv = minimist(process.argv.slice(2));

const projectName = argv._[0];
const portInput = argv.port;

if (!projectName) {
    console.error('Usage: npx node-typescript-generator <project-name>');
    process.exit(1);
}



execSync(`mkdir ${projectName}`, { stdio: 'inherit' });

const templateDir = __dirname + '/Structure';
const projectDir = process.cwd() + '/' + projectName;

fs.copySync(templateDir, projectDir);

process.chdir(projectDir);

let packageJsonFile = `${projectDir}/package.json`
addLineToAFile(
    packageJsonFile,
    '"name": "typescripttest"',
    `"name": "${projectName.toLowerCase()}"`
)

if(portInput){
    let envFile = `${projectDir}/.env`
    addLineToAFile(
        envFile,
        'PORT=8000',
        `PORT=${portInput}`
    )
}


execSync(`npm i ${allPackages.join(' ')}`, { stdio: 'inherit' });
execSync(`npm i -D ${devDependencies.join(' ')}`, { stdio: 'inherit' });

console.log(`Created a new Node Js project: ${projectName}`);