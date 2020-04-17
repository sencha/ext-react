import React, {Component} from 'react';
import { Container, Column, Grid, Datecolumn, Checkcolumn } from '@sencha/ext-react-modern';
import model from '../PlantModel';

Ext.require([
    'Ext.grid.rowedit.Plugin'
])

export default class RowEditingExample extends Component {

    plants = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,

        proxy: {
            type: 'ajax',
            url: 'resources/data/Grids/plants.xml',
            reader: {
                type: 'xml',
                record: 'plant'
            }
        }
    })

  render() {
    return (
    <Container padding="10" layout="fit" fitToParent={true}>
        <Grid
          title="Row Editing"
          store={this.plants}
          shadow={true}
          height="700"
          width="600"
          rowNumbers={true}
          markDirty={true}
          plugins={{ rowedit: { autoConfirm: false }}}
        >
          <Column
            text= 'Common Name'
            flex= {1}
            width= "100"
            dataIndex= "common"
            editable= {true}
          >
          </Column>
          <Column
            text= 'Light'
            width= "125"
            flex= {1}
            dataIndex= "light"
            editable= {true}
            editor= {{
                xtype: 'selectfield',
                options: [
                    'Shade',
                    'Mostly Shady',
                    'Sun or Shade',
                    'Mostly Sunny',
                    'Sunny'
                ]
            }}/>
          <Column
            text= 'Price'
            width= "100"
            flex= {1}
            formatter= "usMoney"
            dataIndex= 'price'
            editable= {true}>
          </Column>
          <Datecolumn
            text= 'Available'
            width= '125'
            flex= "1"
            dataIndex= 'availDate'
            editable={true}
          />
          <Checkcolumn
            text= 'Indoor?'
            flex= "1"
            dataIndex= 'indoor'
            headerCheckbox= {true}
          />
        </Grid>
      </Container>

    )
  }

  onApprove = (grid, info) => {
    Ext.Msg.alert('Approve', info.record.get('name'));
  }

  onDecline = (grid, info) => {
    Ext.Msg.alert('Decline', info.record.get('name'));
  }

  renderSign = (format, value) => (
    Ext.util.Format.number(value, format)
    //  <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
    //      {Ext.util.Format.number(value, format)}
    //  </span>
  )

  summarizeCompanies = (grid, context) => context.records.length + ' Companies';
}