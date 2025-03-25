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
const MongoUrlInput = argv.db;
const JDTinput = argv.jwt

if (!projectName) {
    console.error('Usage: npx node-typescript-generator <project-name>');
    process.exit(1);
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

execSync(`mkdir ${projectName}`, { stdio: 'inherit' });

const templateDir = __dirname + '/Structure';
const projectDir = process.cwd() + '/' + projectName;

fs.copySync(templateDir, projectDir);

process.chdir(projectDir);

execSync(`npm init`, { stdio: 'inherit' });

let packageJsonFile = `${projectDir}/package.json`
addLineToAFile(
    packageJsonFile,
    `" && exit 1"`,
    `" && exit 1",
    "start": "eslint . --ext .ts  --fix && nodemon",
    "dev": "nodemon",
    "lint": "eslint . --ext .ts --fix"
    `,
)

let envFile = `${projectDir}/.env`
if (portInput) {
    addLineToAFile(
        envFile,
        'PORT=8000',
        `PORT=${portInput}`
    )
}

if (MongoUrlInput) {
    addLineToAFile(
        envFile,
        'MONGODB_URI=** your mongodb url**',
        `MONGODB_URI=${MongoUrlInput}`
    )
}

if (JDTinput) {
    addLineToAFile(
        envFile,
        'JWT_SECRET=** your jwt secret **',
        `JWT_SECRET=${JDTinput}`
    )
} else {
    addLineToAFile(
        envFile,
        'JWT_SECRET=** your jwt secret **',
        `JWT_SECRET=${makeid(30)}`
    )
}

execSync(`npm i ${allPackages.join(' ')}`, { stdio: 'inherit' });
execSync(`npm i -D ${devDependencies.join(' ')}`, { stdio: 'inherit' });

console.log(`Created a new Node Js project: ${projectName}`);