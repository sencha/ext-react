
export function getMenu() {

  var j = [
    { id: 0, name: "Home", type: "home",
      items: [
        { id: 1, name: "Welcome", type: "welcome" },
        { id: 2, name: "Guides", type: "guidemid",
        subitems: [
          { id: 1, name: "Getting Started", type: "guide" },
          { id: 2, name: "Getting Started - Detailed", type: "guide" },
        ]
      },
      ]
    },
    { id: 1, name: "ExtGrid", type: "root",
      items: [
        { id: 1, name: "ExtGrid Overview", type: "overview" },

        { id: 2, name: "ExtGrid Guides", type: "guidemid",
          subitems: [
            { id: 1, name: "Widget Integration", type: "guide" },
            { id: 2, name: "Grid Configurations", type: "guide" },
          ]
        },
        { id: 3, name: "Row Examples", type: "examplemid",
          subitems: [
            { id: 1, name: "Rows", type: "example" },
            { id: 2, name: "Row Editing", type: "example" },
          ]
        },
        { id: 4, name: "Column Examples",
          subitems: [
            { id: 1, name: "Columns" },
            { id: 2, name: "Filtering" },
            { id: 3, name: "Cell Editing" },
          ]
        }
      ]
    },
    { id: 2, name: "ExtPivotGrid", type: "root",
      items: [
        { id: 1, name: "ExtPivotGrid Overview" },
        { id: 2, name: "ExtPivotd3container Overview" },
        { id: 3, name: "ExtPivotheatmap Overview" },
        { id: 4, name: "ExtPivottreemap Overview" },
        { id: 5, name: "Examples",
          subitems: [
            { id: 1, name: "D3 1" },
            { id: 2, name: "D3 2" }
          ]
        }
      ]
    },
    { id: 3, name: "ExtTree", type: "root",
      items: [
        { id: 1, name: "ExtD3-canvas" },
        { id: 2, name: "ExtD3-heatmap" },
        { id: 3, name: "Examples",
          subitems: [
            { id: 1, name: "D3 1" },
            { id: 2, name: "D3 2" }
          ]
        }
      ]
    },
    { id: 4, name: "ExtChart", type: "root",
      items: [
        { id: 1, name: "ExtD3-canvas" },
        { id: 2, name: "ExtD3-heatmap" },
        { id: 3, name: "Examples",
          subitems: [
            { id: 1, name: "D3 1" },
            { id: 2, name: "D3 2" }
          ]
        }
      ]
    },
    { id: 5, name: "ExtD3", type: "root",
      items: [
        { id: 1, name: "ExtD3-canvas Overview", type: "overview" },
        { id: 2, name: "ExtD3-heatmap Overview", type: "overview" },
        { id: 3, name: "Examples", type: "examplemid",
          subitems: [
            { id: 1, name: "D3 1" },
            { id: 2, name: "D3 2" }
          ]
        }
      ]
    },
    { id: 6, name: "ExtCalendar", type: "root",
      items: [
        { id: 1, name: "ExtCalendar Overview", type: "overview" },
        { id: 2, name: "ExtCalendar-day Overview", type: "overview" },
        { id: 3, name: "Examples", type: "examplemid",
          subitems: [
            { id: 1, name: "Basic Calendar", type: "example" },
            { id: 2, name: "Another Calendar", type: "example" },
          ]
        }
      ]
    }
  ]
  return j;
}


// [
//   "ExtCalendar",
//   "ExtCalendar-day",
//   "ExtCalendar-days",
//   "ExtCalendar-daysview",
//   "ExtCalendar-dayview",
//   "ExtCalendar-list",
//   "ExtCalendar-month",
//   "ExtCalendar-monthview",
//   "ExtCalendar-multiview",
//   "ExtCalendar-week",
//   "ExtCalendar-weeks",
//   "ExtCalendar-weeksview",
//   "ExtCalendar-weekview",

//   "ExtChart",

//   "ExtD3",
//   "ExtD3-canvas",
//   "ExtD3-heatmap",
//   "ExtD3-horizontal-tree",
//   "ExtD3-pack",
//   "ExtD3-partition",
//   "ExtD3-sunburst",
//   "ExtD3-svg",
//   "ExtD3-tree",
//   "ExtD3-treemap",

//   "ExtGrid",

//   "ExtPivotd3container",
//   "ExtPivotgrid",
//   "ExtPivotheatmap",
//   "ExtPivottreemap",

//   "ExtPolar",
//   "ExtTree",
//   "ExtTreelist"
//  ]