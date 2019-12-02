# ExtReact Babel Plugin

This [Babel](https://babeljs.io/) plugin allows you to import Ext JS Components as React Components using the following syntax...

```jsx
import { Grid, Panel } from '@sencha/ext-modern';
```

... which this plugin converts to ...

```jsx
import { reactify } from '@sencha/ext-react-modern';
const Grid = reactify('grid');
const Panel = reactify('panel');
```

You can also use it to load components from the classic toolkit:

```jsx
import { Grid, Panel } from '@sencha/ext-classic';
```

# Installation

Install via npm...

```bash
npm install --save-dev @sencha/ext-react-babel-plugin
```

...then add to .babelrc:

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": ["@sencha/ext-react-babel-plugin"]
}
```