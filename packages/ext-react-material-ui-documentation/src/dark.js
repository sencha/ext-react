// @flow
// Duotone Dark
// Author: Simurai, adapted from DuoTone themes for Atom (http://simurai.com/projects/2016/01/01/duotone-themes)
// Conversion: Bram de Haan (http://atelierbram.github.io/Base2Tone-prism/output/prism/prism-base2tone-evening-dark.css)
// Generated with Base16 Builder (https://github.com/base16-builder/base16-builder)

//import type { PrismTheme } from "../types";

//backgroundColor: "#000000",
//color: "#ffffff"

//var theme: PrismTheme = {
var theme = {
  plain: {
    fontSize: '14px',
    backgroundColor: "white",
    color: "black"
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      style: {
        color: "black"
      }
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["tag", "operator", "number"],
      style: {
        color: "black"
      }
    },
    {
      types: ["property", "function"],
      style: {
        color: "black"
      }
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "black"
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "black"
      }
    },
    {
      types: [
        "boolean",
        "string",
        "entity",
        "url",
        "attr-value",
        "keyword",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "at-rule",
        "placeholder",
        "variable"
      ],
      style: {
        color: "black"
      }
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through"
      }
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["important"],
      style: {
        color: "black"
      }
    }
  ]
};

export default theme;