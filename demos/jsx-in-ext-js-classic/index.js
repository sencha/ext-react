import React from 'react';
import ReactDOM from 'react-dom';
import JsxPart4 from "./components/react/JsxPart4.js";
import Part1 from "./components/react/Part1.js";
import Names from "./components/react/Names.js";

Ext.React = React;
Ext.ReactDOM = ReactDOM;
Ext.components = {}
Ext.components.react = {}

Ext.components.react.Part1 = Part1;
Ext.components.react.Names = Names;
Ext.components.react.JsxPart4 = JsxPart4;
