# Web Wallet

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn`

Install all the dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Features

- Login - Logout
- Fetch exchange rates using https://www.blockchain.com/api/exchange_rates_api
- Select a currency and update the amount of the user
- Sell or buy bitcoin

## Notes

To login you can use any user or password you want.
The application displays error only if you don't put anything or use protected values such as "admin" for username and "password" for password.

## Dependencies

Below a list of the main external packages used in the application.

- Redux Toolkit -> to handle global state
- Formik -> to handle forms
- Axios -> to make http calls
- React router dom -> client-side routing

I choose TailwindCSS as CSS framework to build fast and responsive UI.

# In depth analysis

Almost all the code is inside the "src" folder.

In "app" you can find "hooks.ts" and "store.ts" which are two configuration files and I put them here as explained in the guidelines of Redux Toolkit.

"components" folder contains a list of component. The idea here is to develop component which are ideally stateless or with few logic inside.

The stateful components and the major part of logic are inside the folder "containers".
Each container can represent a page in the application.
A container can also have a list of nested components if their scope is limited to that container.
The choice to create a file with the name of the folder and export it inside the index is a pattern helps you to see immediatly on which file you are working on.
Alternative

"entities" are a sort of abstraction of a container or multiple container. Here you can find utils, constants, service and mock files.

In "models" I defined the main interfaces used in the app. Local ones are defined inside the related file.
