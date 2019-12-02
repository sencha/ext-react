import topoData from './WorldTopoData';
import Legend from './Legend';
import { reactify } from '@sencha/ext-react-modern';
import * as topojson from 'topojson-client';

Ext.require('Ext.d3.mixin.ToolTip');
Ext.require('Ext.d3.interaction.PanZoom');

Ext.require('Ext.d3.*');

const WorldMap = Ext.define('ConferenceApp.WorldMap', {
    extend: 'Ext.d3.svg.Svg',
    mixins: ['Ext.d3.mixin.ToolTip'],
    xtype: 'worldmap',

    width: 960,
    height: 960,

    legendRect: {
        x: 10,
        y: 400,
        width: 100,
        height: 150
    },

    emptyColor: 'lightgray',

    defaultCls: {
        country: 'country'
    },

    config: {
        colorAxis: {},
        mapAxis: {},
        store: null,
        tooltip: {
            renderer: function (component, tooltip, datum, element, event) {
                tooltip.setHtml(component.getTooltip(datum));
            }
        },
        legend: false
    },

    constructor: function (config) {
        this.superclass.constructor.call(this, config);
        this.mixins.d3tooltip.constructor.call(this, config);
    },

    applyStore: function (store, oldStore) {
        store = this.superclass.applyStore.call(this, store, oldStore);
        store.on({
            load: {
                fn: this.updateDomain,
                scope: this
            }
        });
        return store;
    },

    applyColorAxis: function (colorAxis, oldColorAxis) {
        if (colorAxis) {
            colorAxis = new Ext.d3.axis.Color(colorAxis);
        }
        return colorAxis || oldColorAxis;
    },

    applyMapAxis: function (axis, oldAxis) {
        if (axis) {
            axis = new Ext.d3.axis.Data(Ext.merge({
                component: this
            }, axis));
        }
        return axis || oldAxis;
    },

    applyTooltip: function (tooltip, oldTooltip) {
        if (tooltip) {
            tooltip.delegate = 'path.' + this.defaultCls.country;
        }
        return this.mixins.d3tooltip.applyTooltip.call(this, tooltip, oldTooltip);
    },

    applyLegend: function (legend, oldLegend) {
        var me = this;

        if (legend) {
            legend.axis = me.getColorAxis();
            legend = new Legend(Ext.merge({
                component: me
            }, legend));
        }

        return legend || oldLegend;
    },

    updateDomain: function () {
        var store = this.getStore(),
            minValue,
            maxValue,
            colorAxis = this.getColorAxis(),
            colorField = colorAxis.getField(),
            legend = this.getLegend();

        if (colorAxis) {
            minValue = store.min(colorField);
            maxValue = store.max(colorField);
            colorAxis.getScale().domain([minValue, maxValue]);
        }
        if (legend) {
            legend.onScaleChange();
        }
    },

    getValueForState: function (state) {
        var record = this.getRecordForState(state),
            colorAxis = this.getColorAxis(),
            colorField = colorAxis.getField();
        return (!Ext.isEmpty(record)) ? record.get(colorField) : 0;
    },

    getRecordForState: function (state) {
        var mapAxis = this.getMapAxis(),
            mapField = mapAxis.getField();
        return this.getStore().findRecord(mapField, state);
    },

    getTooltip: function (d) {
        var country = d.properties.name,
            value = this.getValueForState(country);
        return country + ": " + value;
    },

    onAddCountries: function (selection, path) {
        if (selection.empty()) {
            return;
        }

        selection.append("path").attr("class", "country").attr("d", function (d) {
            var v = path.call(this, d);
            return v;
        });
    },

    onUpdateCountries: function (selection) {
        var me = this,
            colorAxis = this.getColorAxis(),
            colorScale = colorAxis.getScale();

        selection
            .style("fill",function(d){
                var value = me.getValueForState(d.properties.name);
                if (value == 0) {
                    return me.emptyColor;
                }
                return colorScale(me.getValueForState(d.properties.name));
        });
    },

    onRemoveCountries: function (selection) {
        selection.remove();
    },


    listeners: {
        scenesetup: function () {
            this.renderScene();
        },
        sceneresize: function () {
            this.renderScene();
        }
    },

    getRenderedCountries: function (selection) {
        return selection.selectAll('.' + this.defaultCls.country);
    },

    renderScene: function () {
        var scene = this.getScene(),
            projection = d3.geoMercator()
                .scale((this.config.width + 1) / 2 / Math.PI)
                .translate([this.config.width / 2, this.config.height / 2])
                .precision(.1),
            path = d3.geoPath()
                .projection(projection),
            graticule = d3.geoGraticule(),
            countriesData = topoData,
            data = topojson.feature(countriesData, countriesData.objects.countries).features,
            countries,
            legend,
            legendBox;

        if (!this.isConfiguring) {
            scene.append("path")
                .datum(graticule)
                .attr("class", "graticule")
                .attr("d", path);

            scene.append("path")
                .datum(graticule)
                .attr("class", "choropleth")
                .attr("d", path);

            var g = scene.append("g");

            g.append("path")
                .datum({type: "LineString", coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
                .attr("class", "equator")
                .attr("d", path);

            legend = this.getLegend();

            this.onAddCountries(this.getRenderedCountries(g).data(data).enter(), path);
            this.onUpdateCountries(this.getRenderedCountries(g).data(data));
            this.onRemoveCountries(this.getRenderedCountries(g).data(data).exit());

            g.append("path")
                .datum(topojson.mesh(countriesData, countriesData.objects.countries, function(a, b) { return a !== b; }))
                .attr("class", "boundary")
                .attr("d", path);

            if (legend) {
                legendBox = legend.getBox();
                Ext.d3.Helpers.alignRect('center', 'center', legendBox, this.legendRect, legend.getGroup());
            }

            scene.attr("height", this.config.height * 2.2 / 3);
        }
    }
})

export default reactify(WorldMap);