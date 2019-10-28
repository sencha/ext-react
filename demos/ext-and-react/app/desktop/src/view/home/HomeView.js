Ext.define('Ext-and-React.view.home.HomeView',{
    xtype: 'homeview',
    cls: 'homeview',
    controller: {type: 'homeviewcontroller'},
    viewModel: {type: 'homeviewmodel'},
    requires: [],
    bodyPadding: '10px',
    extend: 'Ext.Container',
    items: [
        {
            xtype: 'button',
            text: 'click here to render the elements',
            listeners: {
                click: {
                    element: 'element',
                    fn: function(element){

                        var customreactcomponent = Ext.get('customreactcomponent').dom;
                        var customreactcomponentNewDiv = document.createElement("div");
                        customreactcomponentNewDiv.style.padding = "10px 10px 10px 10px";
                        customreactcomponent.appendChild(customreactcomponentNewDiv);

                        var extreactcomponent = Ext.get('extreactcomponent').dom;
                        var extreactcomponentNewDiv = document.createElement("div");
                        extreactcomponentNewDiv.style.padding = "10px 10px 10px 10px";
                        extreactcomponent.appendChild(extreactcomponentNewDiv);

                        var extwebcomponentscomponent = Ext.get('extwebcomponentscomponent').dom;
                        var extwebcomponentscomponentNewDiv = document.createElement("div");
                        extwebcomponentscomponentNewDiv.style.padding = "10px 10px 10px 10px";
                        extwebcomponentscomponent.appendChild(extwebcomponentscomponentNewDiv);

                        const ReactDOM = window.myVars.ReactDOM;
                        const React = window.myVars.React;
                        const Hello = window.myVars.Hello;
                        const ExtPanel = window.myVars.ExtPanel;

                        ReactDOM.render(
                            React.createElement(
                                Hello,
                                {
                                    text: 'World'
                                },
                                null
                            ),
                            customreactcomponentNewDiv
                        );

                        var element = React.createElement(
                            ExtPanel,
                            {
                                title: 'ExtReact - ExtPanel',
                                shadow: "true",
                                html: 'panel body',
                            },
                            null
                        )
                        console.dir(element)

                        ReactDOM.render(
                            element,
                            extreactcomponentNewDiv
                        );

                        // ReactDOM.render(
                        //     React.createElement(
                        //         ExtPanel,
                        //         {
                        //             title: 'ExtReact - ExtPanel',
                        //             shadow: "true",
                        //             html: 'panel body',
                        //         },
                        //         null
                        //     ),
                        //     extreactcomponentNewDiv
                        // );

                        ReactDOM.render(
                            React.createElement(
                                'ext-panel',
                                {
                                    title: 'ExtWebComponents - ext-panel',
                                    shadow: "true",
                                    html: 'panel body'
                                },
                                null
                            ),
                            extwebcomponentscomponentNewDiv
                        );

                    }
                },
            }
        },

        {xtype: 'panel', html: 'panel body', shadow: "true", title: 'ExtWebComponents - ext-panel'},


        {xtype: 'component', html: 'Custom React component', id: 'customreactcomponent'},
        {xtype: 'component', html: 'ExtReact component', id: 'extreactcomponent'},
        {xtype: 'component', html: 'ExtWebComponents component', id: 'extwebcomponentscomponent'}
    ]

});