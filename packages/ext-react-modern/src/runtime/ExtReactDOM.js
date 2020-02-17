import ReactDOM from 'react-dom';
const Ext = window['Ext'];

export function render(element, container, callback) {
  try {
    Ext.onReady(function () {
      ReactDOM.render(element, container, callback);
    });
  }
  catch(e) {
    console.log(e)
  }
};

const ExtReactDOM = {
  render: render
}
export default ExtReactDOM;