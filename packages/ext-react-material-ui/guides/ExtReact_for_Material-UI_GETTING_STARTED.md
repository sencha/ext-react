# Getting Started with ExtReact for Material-UI

## Requirements
Fetch your npm credentials and generate an application.

### Step 1: Retrieve npm Repo Access Credentials
To gain access to the Sencha npm repository:

Currently ExtReact for Material-UI is delivered to customers through the general ExtReact product.

1. [Start a free trial of ExtReact for Material UI (which is in the ExtReact product)](https://www.sencha.com/products/extreact/evaluate/).
2. [Purchase ExtReact for Material UI (which is in the ExtReact product)](https://www.sencha.com/store/extreact/).

#### Login to the npm repository
Once you have your credentials login to the npm repo.

```sh
npm login --registry=https://npm.sencha.com/ --scope=@sencha
```

### Step 2: Create a React starter app

To get started with ExtReact for Material-UI, first create a starter application with create-react-app.

More details on create-react-app are [available here](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)

Open up terminal (mac) or command (window) and navigate to the folder where you want to create your application.

Run the following:

```
npx create-react-app --template @sencha/ext-react-material-ui my-ext-react-material-ui-app
```

The application generation will take a few minutes and will generate in a folder called 'my-ext-react-material-ui-app'

Change your directory to the created app folder:

```
cd my-ext-react-material-ui-app
```

### Step 3: Run the ExtReact for Material-UI app

To see the application running in a browser, thpe the following in the terminal/command window:

```
npm start
```

A browser window will load, and you will see the application:

![final](final.png)