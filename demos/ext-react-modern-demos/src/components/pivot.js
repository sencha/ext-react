import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Container, PivotGrid } from "@sencha/ext-react-modern";
import data from './mockdata';

// const grouperFn = function (rec) {
//   return `${rec.get('name')} -  ${rec.get('email')}`;
// };

const jsxGrouperFn = (rec) => {
  var jsx =
  <div>
    <span><strong>name:</strong> {rec.data.name}</span>
    <br/>
    <span><strong>email:</strong> {rec.data.email}</span>
  </div>

  return ReactDOMServer.renderToStaticMarkup(jsx);
}

const jsxLabelRenderer = (v) => {
  var jsx =
  <span><strong>name: </strong>{v}</span>
  
  return ReactDOMServer.renderToStaticMarkup(jsx);
}

const pivotMatrix = {
  type: 'local',
  collapsibleRows: true,
  collapsibleColumns: false,
  rowGrandTotalsPosition: 'first',
  textGrandTotalTpl: 'Total',
  viewLayoutType: 'outline',
  leftAxis: [
    {
      header: 'First',
      dataIndex: 'email',
      width: 200,
      grouperFn: jsxGrouperFn
      //labelRenderer: jsxLabelRenderer
    },
    {
      header: 'Second',
      dataIndex: 'name',
      width: 200,
    }
  ],
  aggregate: [
    {
      header: 'Count',
      dataIndex: 'num',
      aggregator: 'count'
    },
    {
      header: 'Sum',
      dataIndex: 'num',
      aggregator: 'sum'
    }
  ],
  store: {
    proxy: { type: 'memory' },
    data
  }
};

class pivot extends Component {
  render() {
    return (
      <Container layout="fit" shadow>
        <PivotGrid title="Pivot Grid" matrix={pivotMatrix}/>
      </Container>
    )
  }
}
export default pivot;