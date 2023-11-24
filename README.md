# node-typescript-generator
![npm](https://img.shields.io/npm/dt/node-typescript-generator?style=flat-square)   ![NPM](https://img.shields.io/npm/l/node-typescript-generator?style=flat-square)   ![npm](https://img.shields.io/npm/v/node-typescript-generator?style=flat-square)   ![npm collaborators](https://img.shields.io/npm/collaborators/node-typescript-generator?style=flat-square)   ![Dependents (via libraries.io)](https://img.shields.io/librariesio/dependents/npm/node-typescript-generator?style=flat-square)  ![GitHub Repo stars](https://img.shields.io/github/stars/ayand269/node-typescript-generator)

*Note: This README is only relevant to the latest version of our plugin. If you are using an older version, please switch to the relevant tag on [our GitHub repo](https://github.com/ayand269/node-typescript-generator) to view the docs for that particular version.*
This plugin provides a nodejs project template that contain a very usefull file structure, with middleware, controller, routes, models, mongodb and typescript. And also configure all relevant packages with ESlint.

## Getting Started
Follow the instruction given bellow 

```shell
npx node-typescript-generator <ProjectName>
```

## ⚙️ Options

| Flag | Input | Description |
| ---- | ----- | ----------- |
| --port | [string] | Give the port in which you want to run your project |
| --db | [string] | Give the MongoDB URL to which you want to connect the database on your project |
| --jwt | [string] | Could you give the JWT_SECRET to which you want to use middleware on your project?. If you are not set then we can create random. |