import React from 'react'
import App from './App'
import ExtReactDOM from '@sencha/ext-react-classic';

ExtReactDOM.render(<App/>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./App', () => render(App, viewport))
}
