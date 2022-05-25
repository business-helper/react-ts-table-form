# React Application

This is a React application using react-table.
It loads data from json file and show them in the react table.
The table is responsive hiding columns according to the table width.
Once a table row is clicked, it show split view for a update form, which shows dynamic fields based on the passed meta data.

## Tech stack

- React v17
- Typescript
- Redux Thunk
- Tailwind CSS
- React Icons
- Jest
- Cypress
- Continuous Integration

## Structure

```bash
.
├── public
└── src
    ├── __tests__
    ├── components
    ├── layouts
    ├── pages
    ├── providers
    ├── store
    ├── types
```

### public

This is the folder contains the HTML file and static asset files.

### src/\_\_tests\_\_

contains all unit tests.

### src/components

contains all reusable components.

### src/layouts

contains the layout components.

### src/pages

contains the page files which are included in the routing system.

### src/providers

contains the providers interacting with external sources.

### src/store

implements redux store.

### src/types

contains the typescript types.

## How to run the application

You can run the following commands to start the application and for the unit/integration tests.

```bash
# npm
npm install
npm start # run the application on local
npm run test # run unit testing
npm run test:e2e # integration testing using cypress
npm run cypress:run # silent mode of cypress test


# yarn
yarn
yarn start # start the application on local
yarn run test # unit testing
yarn test:e2e # integration testing using cypress
yarn cypress:run # silent mode of cypress test

```
