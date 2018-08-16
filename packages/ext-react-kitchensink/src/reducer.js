import { ROUTE_DID_CHANGE, TOGGLE_CODE, TOGGLE_TREE } from './actions';
import examples from './examples';

const code = window._code;

// Here we initialize the Ext JS TreeStore for the navigation tree as part of our
// redux store.
const initialState = {
    navStore: Ext.create('Ext.data.TreeStore', {
        rootVisible: true,
        root: examples
    }),
    selectedNavNode: examples,
    mode: 'full',
    layout: 'fit',
    showCode: false,
    showTree: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ROUTE_DID_CHANGE: {
      const { location } = action;
      const { navStore } = state;
      const node = navStore.getNodeById(location.pathname);
      
      return {
        ...state,
        component: node && node.get('component'),
        layout: (node && node.get('layout')) || 'fit',
        selectedNavNode: node,
        files: code[node.get('text').replace(/\s/g, '')]
      }
    }
    case TOGGLE_CODE: {
      return { ...state, showCode: !state.showCode };
    }
    case TOGGLE_TREE: {
      return { ...state, showTree: !state.showTree };
    }
    default: {
      return { ...state }
    }
  }
}