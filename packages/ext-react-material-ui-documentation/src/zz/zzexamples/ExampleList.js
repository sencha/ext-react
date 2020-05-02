
export function getCode (type)  {
  const codeGrid1 = `
class App extends React.Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
    ]
    this.store = {type: 'store', data: data}

    this.columns = [
      { text:'name1',dataIndex:'name'},
    ]
  }


  render() {
    return (
      <ExtGrid height="300"
        ref={ grid => this.grid = grid }
        title="The Grid"
        store={ this.store }
        columns={ this.columns }
      >
      </ExtGrid>
    )
  }

}
`

const codeGrid2 = `
class App extends React.Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
    ]
    this.store = {type: 'store', data: data}

    this.columns = [
      { text:'name2',dataIndex:'name'},
      { text:'email',dataIndex:'email'},
    ]
  }


  render() {
    return (
      <ExtGrid height="300"
        ref={ grid => this.grid = grid }
        title="The Grid"
        store={ this.store }
        columns={ this.columns }
      >
      </ExtGrid>
    )
  }

}
`

const codeGrid3 = `
class App extends React.Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
      { name: 'Andy', email: 'andy@gmail.com',priceChangePct: .45 }
    ]
    this.store = {type: 'store', data: data}

    this.columns = [
      { text:'name3',dataIndex:'name'},
      { text:'email',dataIndex:'email'},
      { text:'priceChangePct',dataIndex:'priceChangePct'},
    ]
  }


  render() {
    return (
      <ExtGrid height="300"
        ref={ grid => this.grid = grid }
        title="The Grid"
        store={ this.store }
        columns={ this.columns }
      >
      </ExtGrid>
    )
  }

}
`

  return [
    {name: 'Basic Grid', text: 'shows basic features', code: codeGrid1},
    {name: 'Summary Grid', text: 'uses summary column', code: codeGrid2},
    {name: 'Infinite Grid', text: 'Big Data features', code: codeGrid3},
  ]
}


export function getExamples (type)  {
  var theList = []
  switch(type) {
    // case 'ExtGrid':
    //   theList = [
    //     { _uid: "BUY6Drn9e1",component: "GridPage",headline: "Foo"},
    //     {_uid: "gJZoSLkfZV",component: "GridOne",title: "Bar"},
    //   ]
    //   break;
    // case 'ExtCalendar':
    //   theList = [
    //      {_uid: "gJZoSLkfZV",component: "CalendarPage",title: "Bar"},
    //     {_uid: "gJZoSLkfZV",component: "CalendarOne",title: "Bar"},
    //   ]
    //   break;
    default:
      // theList = [
      //   "GridPage",
      //   "GridOne",
      // ]
      theList = [
         {_uid: "gJZoSLkfZV",component: "CalendarPage",name: "CP 1", desc: 'the desc1'},
        {_uid: "gJZoSLkfZV",component: "CalendarOne",name: "CP 2", desc: 'the desc2'},
      ]
      break;
  }
  return theList


}