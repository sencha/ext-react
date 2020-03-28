import ReactDOM from 'react-dom';
//const Ext = window['Ext'];

export function render(element, container, callback) {
  try {
    Ext.onReady(function () {
      if (Ext.isClassic) {
        Ext.tip.QuickTipManager.init();
        Ext.QuickTips.init();
      }
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