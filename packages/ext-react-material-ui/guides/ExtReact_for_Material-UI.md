## Creating a new project with ExtReact for Material-UI

## Requirements
Fetch your npm credentials and generate an application.

### Step 1: Retrieve npm Repo Access Credentials
To gain access to the Sencha npm repository:

1. [Start a free trial of ExtReact](https://www.sencha.com/products/extreact/evaluate/).
2. [Purchase ExtReact or Ext JS Enterprise](https://www.sencha.com/store/).

* **Note:** Ext JS enterprise customers already have access to ExtReact.
* **Note:** Existing customers use your support portal credentials. But switch the username, `@` character with `'..'` two periods, so the username would look something like this after it's converted: `name..gmail.com`.

### Step 2: Login to the npm repository
Once you have your credentials login to the npm repo.

production:

```sh
npm login --registry=https://npm.sencha.com/ --scope=@sencha
```

early adopter:

```sh
npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha
```

### Step 3: Create a React application with create-react-app and 'ExtReact for Material-UI' template

- Run the following:

```sh
npx create-react-app --template @sencha/ext-react-material-ui ext-react-material-ui-demo
```

create-react-app will create a new application using the ext-react-material-ui template
(from the sencha/ext-react git repo)

- When create-react-app is completed, Run the following:

```sh
cd ext-react-material-ui-demo
```

- To start the ExtReact application, run the following in a terminal window:

```sh
npm start
```

The ExtReact application will load in a browser window!
