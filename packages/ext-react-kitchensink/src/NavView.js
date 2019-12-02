import React from 'react';

import { Container } from '@sencha/ext-react-modern';

export default function NavView({ node }) {

  function onClick(e, path) {
    Ext.get(e.target).ripple(e, {});
    requestAnimationFrame(() => location.hash = path, 50)
  }

  return (
    <Container layout="center" padding="20" scrollable className="app-navview">
      <div style={{textAlign: 'center'}}>
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
  </Container>
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