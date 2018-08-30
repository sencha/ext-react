import _getIterator from 'babel-runtime/core-js/get-iterator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { reactify } from './index';
var ExtReact = reactify('ExtReact');
//import { ExtReact } from '@sencha/ext-react'

var launchQueue = [];

/**
 * Higher order function that returns a component that waits for a ExtReact to be ready before rendering.
 * @param {class} Component 
 * @return {class}
 */
export default function renderWhenReady(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(ExtReactRenderWhenReady, _React$Component);

        function ExtReactRenderWhenReady() {
            _classCallCheck(this, ExtReactRenderWhenReady);

            var _this = _possibleConstructorReturn(this, _React$Component.call(this));

            console.log('constructor');

            _this.state = {
                ready: Ext.isReady,
                done: false
            };
            return _this;
        }

        ExtReactRenderWhenReady.prototype.componentWillMount = function componentWillMount() {
            console.log('componentWillMount');
            console.log(this.state.ready);
            if (!this.state.ready) {
                launchQueue.push(this);
            }
        };

        ExtReactRenderWhenReady.prototype.render = function render() {
            console.log('render');
            console.log(this.state.ready);

            if (this.state.ready === true && this.state.done == false) {
                console.log('in');
                this.state.done = true;
                return React.createElement(Component, this.props);

                //return <ExtReact><Component {...this.props}/></ExtReact>
                //return <div>hi</div>
            } else {
                return false;
            }

            // return this.state.ready === true && (
            //     <ExtReact><Component {...this.props}/></ExtReact>
            // );
        };

        return ExtReactRenderWhenReady;
    }(React.Component), _class.isExtJSComponent = true, _temp;
}

Ext.onReady(function () {
    for (var _iterator = launchQueue, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var queued = _ref;

        queued.setState({ ready: true });
    }
});
//# sourceMappingURL=renderWhenReady.js.map