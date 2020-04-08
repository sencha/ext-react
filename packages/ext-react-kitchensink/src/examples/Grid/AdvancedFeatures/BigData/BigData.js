import React, { Component } from 'react';
import { Grid, ActionSheet, Container, Button, SparkLineLine, RendererCell, Column, TextColumn, CheckColumn, NumberColumn, DateColumn, Rating, GridSummaryRow, WidgetCell } from '@sencha/ext-react-modern';
import model from './GridModel';
import './data';
import './style.css';

Ext.require([
    'Ext.grid.plugin.*',
    'Ext.tip.ToolTip',
    'Ext.data.summary.Sum',
    'Ext.exporter.*'
]);

export default class BigDataGridExample extends Component {

  state = {
    showExportSheet: false
  };

  store = Ext.create('Ext.data.Store', {
    model,
    autoLoad: true,
    pageSize: 0,
    groupField: 'department',
    proxy: {
      type: 'ajax',
      url: '/KitchenSink/BigData'
    }
  });

  render() {
    const { showExportSheet } = this.state;

    //ref={grid => this.grid = grid}

    return (
      <Container layout="fit" shadow>
          <ActionSheet displayed={showExportSheet}>
              <Button handler={this.exportToXlsx} text="Excel xlsx"/>
              <Button handler={this.exportToXml} text="Excel xml"/>
              <Button handler={this.exportToCSV} text="CSV"/>
              <Button handler={this.exportToTSV} text="TSV"/>
              <Button handler={this.exportToHtml} text="HTML"/>
              <Button handler={this.onCancelExport} text="Cancel"/>
          </ActionSheet>
        <Grid
          ref={ grid => this.grid = grid }
          title="Big Data Grid"
          store={this.store}
          shadow
          grouped
          rowNumbers
          plugins={{
            grideditable: true,
            gridviewoptions: true,
            summaryrow: true,
            rowexpander: true,
            gridexporter: true,
            rowoperations: true
          }}
          groupFooter={{
            xtype: 'gridsummaryrow'
          }}
          itemConfig={{
          // ViewModel is required to use bind property
          viewModel: {

          },
            body: {
              tpl: this.rowBodyTpl
            }
          }}
          onBeforeDocumentSave={this.onBeforeDocumentSave}
          onDocumentSave={this.onDocumentSave}
          titleBar={{
            shadow: false,
            items: [{
              align: 'right',
              xtype: 'button',
              text: `Export to${Ext.os.is.Phone ? '...' : ''}`,
              menu: Ext.os.is.Desktop && {
                indented: false,
                items: [
                  { text: 'Excel xlsx', handler: this.exportToXlsx },
                  { text: 'Excel xml', handler: this.exportToXml },
                  { text: 'CSV', handler: this.exportToCSV },
                  { text: 'TSV', handler: this.exportToTSV },
                  { text: 'HTML', handler: this.exportToHtml },
                ]
              },
              handler: !Ext.os.is.Desktop && this.onExportClick
            }]
          }}
        >
          <TextColumn
            text="Id"
            dataIndex="employeeNo"
            flex="1"
            minWidth="100"
            exportStyle={{
              format: 'General Number',
              alignment: {
                horizontal: 'Right'
              }
            }}
          />
          <TextColumn
            text="Name"
            dataIndex="fullName"
            minWidth="150"
            sorter={{
              sorterFn:this.nameSorter
            }}
          />
          <CheckColumn
              text="Verified"
              dataIndex="verified"
              headerCheckbox
          />

          <Column text="Ratings"
            columns= {
              [
                {
                  text: 'Avg',
                  xtype: 'numbercolumn',
                  dataIndex: 'averageRating',
                  renderer : this.renderRating,
                  summary: 'average',
                  width: 75,
                  cell: {
                    cls: 'big-data-ratings-cell'
                  },
                  exportStyle: {
                    format: 'Standard',
                    alignment: {
                      horizontal: 'Right'
                    }
                  }
              },
              {
                text: 'All',
                dataIndex: 'rating',
                ignoreExport: true,
                cell: {
                  xtype: 'widgetcell',
                  forceWidth: true,
                  widget: {
                    xtype: 'sparklineline',
                    tipTpl:'Price: {y:number("0.00")}'
                  }
                }
              }
            ]
          }
          />
          <DateColumn
              text="Date of Birth"
              dataIndex="dob"
              editable
              format='d-m-Y'
              exportStyle={[{
                  // no type key is defined here which means that this is the default style
                  // that will be used by all exporters
                  format: 'Medium Date',
                  alignment: {
                      horizontal: 'Right'
                  }
              }, {
                  // the type key means that this style will only be used by the csv exporter
                  // and for all others the default one, defined above, will be used
                  type: 'csv',
                  format: 'Short Date'
              }]}
          />

          <Column
              text=""
              width="100"
              ignoreExport
              align="center"
              // Summary rows do not create widgetcells unless set as
              // the summaryCell
              summaryCell =  {{
                  xtype: 'widgetcell',
                  widget: {
                    xtype: 'button',
                    ui: 'action',
                    text: 'All',
                    handler: this.onVerifyAll
                  }
              }}
            >
              <WidgetCell>
                <Button ui ="action" handler = {this.onVerify} bind = {{tooltip : 'Verify {record.fullName}'}} text = "VERIFY"/>
              </WidgetCell>
          </Column>

          <DateColumn
              text="Join Date"
              dataIndex="joinDate"
              editable
              format="d-m-Y"
              exportStyle={{
                  format: 'Medium Date',
                  alignment: {
                      horizontal: 'Right'
                  }
              }}
          />
          <TextColumn
              text="Notice Period"
              dataIndex='noticePeriod'
              editable
          />
          <TextColumn
              text="Email"
              dataIndex="email"
              width="250"
              editable
              editor={{
                  xtype:'emailfield'
              }}
          />
          <Column text='Absences'>
              <TextColumn  text="Illness"
                            dataIndex="sickDays"
                            align='center'
                            summary='sum'
              />
              <TextColumn
                  text="Holidays"
                  dataIndex="holidayDays"
                  align='center'
                  summary='sum'
              />
              <TextColumn
                  text="Holiday Allowance"
                  dataIndex="holidayAllowance"
                  align='center'
                  summary='sum'
                  summaryFormatter='number("0.00")'
                  formatter='number("0.00")'
              />
          </Column>
          <Column
              text="Rating<br/>This Year"
              dataIndex="ratingThisYear"
              groupable={false}
              formatter='round(1)'
              summary='average'
              cell={
                {
                  xtype: 'widgetcell',
                  widget: {
                  xtype: 'rating',
                  tip: 'Set to {tracking:plural("Star")}'
                  }
                }
              }
              exportStyle= {{
                alignment: {
                    horizontal: 'Right'
                }
             }}
            //renderer={this.renderRatingThisYear}
          />



          <TextColumn
              text='Salary'
              dataIndex='salary'
              renderer={Ext.util.Format.usMoney}
              width='150'
              editable
              summary='sum'
              summaryRenderer={this.salarySummaryRenderer}
              exportStyle={{
                format: 'Currency',
                alignment: {
                    horizontal: 'Right'
                }
            }}
          />
        </Grid>
      </Container>
    )
  } // end render

  rowBodyTpl = data => (
    <div>
      <img src={data.avatar} height="100px" style={{float:'left', margin:'0 10px 5px 0'}}/>
      <p>{formatDate( data.dob)}</p>
    </div>
  );

  nameSorter = (rec1, rec2) => {
    // Sort prioritizing surname over forename as would be expected.
    var rec1Name = rec1.get('surname') + rec1.get('forename'),
        rec2Name = rec2.get('surname') + rec2.get('forename');

    if (rec1Name > rec2Name) {
      return 1;
    }
    if (rec1Name < rec2Name) {
      return -1;
    }
    return 0;
  }

  onExportClick = () => {
    this.setState({ showExportSheet: true })
  }

  onCancelExport = () => {
    this.setState({ showExportSheet: false })
  }

  exportToXlsx = () => {
    this.doExport({
      type: 'excel07',
      title: 'Grid Export Demo',
      fileName: 'GridExport.xlsx',
      includeGroups: true,
      includeSummary: true
    });
  }

  exportToXml = () => {
    this.doExport({
      type: 'excel03',
      title: 'Grid Export Demo',
      fileName: 'GridExport.xml',
      includeGroups: true,
      includeSummary: true
    });
  }

  exportToCSV = () => {
    this.doExport({
      type: 'csv',
      title: 'Grid Export Demo',
      fileName: 'GridExport.csv'
    });
  }

  exportToTSV = () => {
      this.doExport({
        type: 'tsv',
        title: 'Grid Export Demo',
        fileName: 'GridExport.tsv'
    });
  }

  exportToHtml = () => {
      this.doExport({
        type: 'html',
        title: 'Grid Export Demo',
        fileName: 'GridExport.html'
    });
  }

  onVerify = (button) => {
    let cell = button.up('widgetcell'),
        record = cell.getRecord();
    record.set('verified', !record.get('verified'));
  }

  onVerifyAll = (cell) => {
    let row = cell.up('gridrow'),
        group = row.getGroup(),
        grid = cell.up('grid'),
        store = this.store,
        count;

    if (group) {
      count = group.length;
    } else {
      count = store.getCount();
    }

    Ext.Msg.confirm('Verify All',
      'Are you sure you want to verify all ' + count + ' items?',
      answer => {
        if (answer === 'yes') {
            // Don't want to grid to update on each change:
            store.suspendEvent('update');

            (group || store).each(function (rec) {
              rec.set('verified', true);
            });

            store.resumeEvent('update');

            // Now update all the things
            grid.refresh();
        }
      }
    );
  }

  salarySummaryRenderer = (value) => {
    return Ext.util.Format.usMoney(value);
  }

  doExport(config) {
    this.setState({ showExportSheet: false });
    this.grid.cmp.saveDocumentAs(config);
  }

  renderRating = (value, record) => {
    const age = record.get('averageRating');
    let group = "over6";

    if (age < 4) {
        group = "under4";
    } else if (age < 5) {
        group = "under5";
    } else if (age < 6) {
        group = "under6";
    }

    return <div className={group}>{value.toFixed(2)}</div>
  }

  renderRatingThisYear = (value) => (
    //value && <Rating value={value} tip='Set to {tracking:plural("Star")}'/>
    value
  )

  renderSparkline = (rating) => (
    <SparkLineLine
      height={16}
      values={rating}
      tipTpl='Price: {y:number("0.00")}'
    />
  )

  renderVerify = (value, record) => (
    <Container>
      <Button
        text={value ? 'Verified' : 'Verify'}
        ui="action"
        handler={this.onVerify.bind(this, record)}
      />
    </Container>
  )

  renderVerifyAll = (value, record, dataIndex, cell) => (
    <Container>
      <Button
        ui="action"
        text="All"
        handler={this.onVerifyAll.bind(this, cell)}
      />
    </Container>
  )

  onBeforeDocumentSave = view => {
    view.mask({
      xtype: 'loadmask',
      message: 'Document is prepared for export. Please wait ...'
    })
  }

  onDocumentSave = view => view.unmask()
}

function formatDate(date) {
  return Ext.util.Format.date(date, "d/m/Y")
};
