import React from 'react';

import { Container, Panel } from '@sencha/ext-react-modern';

export default function NavView({ node }) {

    var bodyStyle = `
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    alignItems: center;
    justifyContent: center;

      backgroundSize: 20px 20px;
      borderWidth: 0px;
      backgroundColor: #e8e8e8;
      backgroundImage:
      linear-gradient(0deg, #f5f5f5 1.1px, transparent 0),
      linear-gradient(90deg, #f5f5f5 1.1px, transparent 0)
    `;



  function onClick(e, path) {
    Ext.get(e.target).ripple(e, {});
    requestAnimationFrame(() => location.hash = path, 50)
  }

  return (
    <Panel layout="center" padding="20" bodyStyle={bodyStyle} scrollable>
      <div style={{textAlign: 'center', display: 'inline-block'}}>
         { node && node.childNodes.map((child, i) => (
            <div key={i} className="app-thumbnail">
                <div className="app-thumbnail-icon-wrap" onClick={e => onClick(e, child.id)}>
                    <div className={`app-thumbnail-icon ${child.data.navIcon}`}/>
                </div>
                <div className="app-thumbnail-text">{child.data.name}</div>
                {child.data.premium && <div className="x-fa fa-star app-premium-indicator"/>}
            </div>
        )) }
    </div>
  </Panel>
  )
}

// return (
//   <Container layout="center" padding="20" scrollable className="app-navview">
//     <div style={{textAlign: 'center'}}>x
//         { node && node.childNodes.map((child, i) => (
//             <div key={i} className="app-thumbnail">
//                 <div className="app-thumbnail-icon-wrap" onClick={e => onClick(e, child.id)}>
//                     <div className={`app-thumbnail-icon ${child.data.navIcon}`}/>
//                 </div>
//                 <div className="app-thumbnail-text">{child.data.name}</div>
//                 {child.data.premium && <div className="x-fa fa-star app-premium-indicator"/>}
//             </div>
//         )) }
//     </div>
//   </Container>
// )