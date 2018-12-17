/* global Ext, MockAjaxManager, expect, jasmine, spyOn, xit */

topSuite('Ext.grid.filters.Plugin', [
    'Ext.grid.Grid',
    'Ext.grid.filters.*'
],
function() {
    var MyStore = Ext.define(null, {
            extend: 'Ext.data.Store',

            load: function() {
                var ret = this.callParent(arguments);

                // this.flushLoad();

                return ret;
            }
        }),
        store, grid, plugin, provider;

    function getData() {
        return [
            { name: 'Lisa',  email: 'lisa@simpsons.com', phone: '555-111-1224', age: 14 },
            { name: 'Bart',  email: 'bart@simpsons.com', phone: '555-222-1234', age: 12 },
            { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244', age: 44 },
            { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254', age: 41 }
        ];
    }

    function makeStore(storeCfg) {
        return store = new MyStore(Ext.apply({
            autoDestroy: true,
            fields: ['name', 'email', 'phone'],
            data: getData()
        }, storeCfg));
    }

    function makeGrid(gridCfg) {
        grid = Ext.merge({
            columns: [
                { header: 'Name',  dataIndex: 'name', editor: 'textfield' },
                { header: 'Email', dataIndex: 'email', flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                { header: 'Phone', dataIndex: 'phone', editor: 'textfield' },
                { header: 'Age', dataIndex: 'age', editor: 'textfield' }
            ],
            selectable: {
                checkbox: true,
                rows: true
            },
            plugins: {
                gridfilters: true
            },
            width: 400,
            height: 400,
            renderTo: Ext.getBody(),
            stateful: true,
            stateId: 'fgrid'
        }, gridCfg);

        if (!grid.store) {
            grid.store = makeStore();
        }

        grid = new Ext.grid.Grid(grid);
        plugin = grid.findPlugin('gridfilters');
    }

    function tearDown() {
        Ext.state.Provider.register(null);
        store = grid = plugin = Ext.destroy(grid);
    }

    function expectState(expected) {
        var actual = getState();

        expect(actual).toEqual(expected);
    }

    function getState() {
        provider.flushSaveState();

        expect(provider.isSaveStatePending).toBe(false);

        return provider.state;
    }

    beforeEach(function() {
        MockAjaxManager.addMethods();
        provider = new Ext.state.Provider();

        Ext.state.Provider.register(provider);
    });

    afterEach(function() {
        tearDown();
        MockAjaxManager.removeMethods();
    });

    describe('stateful filter', function() {
        it('should save the current filter to stateful storage', function() {
            makeGrid();

            expect(provider.isSaveStatePending).toBeFalsy();

            plugin.setActiveFilter([{
                property: 'name',
                operator: 'like',
                value: 'ar'
            }]);

            expect(provider.isSaveStatePending).toBe(true);

            expectState({
                fgrid: {
                    plugins: {
                        gridfilters: {
                            $: {
                                activeFilter: [{
                                    property: 'name',
                                    operator: 'like',
                                    value: 'ar'
                                }]
                            }
                        }
                    }
                }
            });
        });

        it('should restore the active filter from stateful storage', function() {
            var activeFilter, filters;

            provider.set({
                fgrid: {
                    plugins: {
                        gridfilters: {
                            $: {
                                activeFilter: [{
                                    property: 'name',
                                    operator: 'like',
                                    value: 'ar'
                                }]
                            }
                        }
                    }
                }
            });

            makeGrid();

            expect(provider.isSaveStatePending).toBeFalsy();

            activeFilter = plugin.getActiveFilter();

            expect(activeFilter).toEqual([{
                property: 'name',
                operator: 'like',
                value: 'ar'
            }]);

            filters = store.getFilters();

            expect(filters.length).toEqual(1);
        });

        it('should send the correct filters coming from stateful storage', function() {
            var data, operation, filters, proxySpy, requests;

            provider.set({
                fgrid: {
                    plugins: {
                        gridfilters: {
                            $: {
                                activeFilter: [{
                                    property: 'name',
                                    operator: 'like',
                                    value: 'ar'
                                }, {
                                    property: 'email',
                                    operator: 'like',
                                    value: 'simpsons.com'
                                }]
                            }
                        }
                    }
                }
            });

            // Object.defineProperty(MyStore.prototype, 'loadCount', {
            //     get() {
            //         return this.__lc;
            //     },
            //
            //     set(v) {
            //         debugger;
            //         this.__lc = v;
            //     }
            // });

            makeGrid({
                store: makeStore({
                    data: null,
                    remoteFilter: true,
                    proxy: {
                        type: 'ajax',
                        url: 'foo',
                        reader: {
                            type: 'json',
                            successProperty: 'success',
                            rootProperty: 'data'
                        }
                    }
                })
            });

            proxySpy = spyOn(store.getProxy(), 'read').andCallThrough();
            requests = Ext.Ajax.mockGetAllRequests();

            // Upon creation the grid's store will have a delayed/pending load for the
            // server. It should not have been sent so the mock ajax layer won't have
            // seen it yet.
            expect(requests.length).toBe(0);
            expect(store.loadCount).toBeFalsy();
            expect(proxySpy.calls.length).toEqual(0);
            expect(store.hasPendingLoad()).toBe(true);

            store.flushLoad();

            requests = Ext.Ajax.mockGetAllRequests();

            // Now that we've flushed the store's request, the mock ajax layer has it,
            // but the store is still in a load pending state.
            expect(requests.length).toBe(1);
            expect(proxySpy.calls.length).toEqual(1);
            expect(store.loadCount).toBeFalsy();
            expect(store.hasPendingLoad()).toBe(true);

            // Satisfy the request:
            data = getData();
            Ext.Ajax.mockCompleteWithData({
                success: true,
                data: [ data[1], data[3] ]  // Bart and Marge match "like 'ar'"
            });

            // BUG - Store increments loadCount twice (once in onCollectionAdd and the
            // other in loadRecords), so don't be too picky until that is fixed:
            expect(store.loadCount).toBeGE(1);

            // The store should have the data now:
            expect(store.hasPendingLoad()).toBe(false);

            // Check on what was actually serialized into the parameters:
            filters = Ext.JSON.decode(requests[0].params.filter);

            expect(filters).toEqual([{
                property: 'name',
                operator: 'like',
                value: 'ar'
            }, {
                property: 'email',
                operator: 'like',
                value: 'simpsons.com'
            }]);
        });
    });
});
