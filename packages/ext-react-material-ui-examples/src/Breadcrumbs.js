import React, {Component} from 'react';
import { BreadcrumbBar } from '@sencha/ext-react-modern';
import root from './examples/index';

export default class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.props = props
        //console.log(this.props)
        this.store = Ext.create('Ext.data.TreeStore', {
            rootVisible: true,
            root: root
        });
    }


onReady = ({cmp, cmpObj}) => {
  //console.log(this)
  //console.log(this.refs.appBreadcrumb.cmp)
  this.breadcrumbCmp = cmp
  this.breadcrumbCmp.setSelection(this.props.node)

}

    componentDidMount() {
      //console.log(this.refs.appBreadcrumb)
      //  this.refs.appBreadcrumb.cmp.setSelection(this.props.node);
    }








    componentDidUpdate(newProps) {
      //console.log(this)
        if (newProps.node.id !== this.props.node.id) {
          //console.log('1')
          //console.log(this.breadcrumbCmp)
          //console.log(newProps.node.getId())

          this.breadcrumbCmp.setSelection(newProps.node)




          // var nodeId = newProps.node.getId()
          // if(nodeId === '' || nodeId) {
          //   location.hash = nodeId;
          // }
          // this.breadcrumbCmp.setSelection(newProps.node);




          //this.refs.appBreadcrumb.cmp.setSelection(newProps.node);
        }
    }

    nav(node) {
      var nodeId = node.getId()
      location.hash = nodeId;
        //console.log('in nav function, node is:');console.dir(node)
        //this.nav(node)
        // var nodeId = node.getId()
        // if(nodeId === '' || nodeId) {
        //   location.hash = nodeId;
        // }


        // if (node.childNodes.length > 0) {
        //     this.hideExamples = false;
        // } else {
        //     this.hideExamples = true;
        // }
        // this.navTreeListCmp.setSelection(node);
        // this.breadcrumbCmp.setSelection(node);
        // //var routediv = document.getElementById('routediv');

        // if (this.hideExamples == false) {
        //     this.codeButtonCmp.setHidden(true);
        //     this.routerCmp.setHidden(true);
        //     // if (routediv != null) {
        //     //     routediv.style.display = 'none';
        //     // }
        //     this.selectionCmp.setStyle({ display: "flex" });
        //     this.selectionCmp.setHidden(false);

        //     this.collapseCode = true;
        //     this.dataviewNavCmp.setData(node.childNodes);
        // } else {
        //     this.codeButtonCmp.setHidden(false);
        //     this.routerCmp.setHidden(false);
        //     // if (routediv != null) {
        //     //     routediv.style.display = 'block';
        //     // }
        //     this.selectionCmp.setStyle({ display: "none" });
        //     this.selectionCmp.setHidden(true);

        //     this.router.navigateByUrl(node.id);

        //     //this.ngZone.run(() => this.router.navigateByUrl(node.id)).then();
        //     this.setCodeTabs(node);
        // }
        // this.cd.detectChanges();
    }



    //onPathChange = (context, node) => {
    onPathChange = ({sender,node, prevNode, eOpts}) => {
      console.log(sender)
      console.log(node)
      console.log(prevNode)
      //var node = detail.node;
      //console.log(detail.node)
      //console.log(node)
      //location.hash = node.id;
      this.nav(node)
    }


    render() {
        return (
            <BreadcrumbBar
                docked="top"
                showIcons= "true"
                store={this.store}
                onReady={this.onReady}
                onChange={this.onPathChange}
                ref="appBreadcrumb"
                useSplitButtons
            >
            </BreadcrumbBar>
        )
    }
}