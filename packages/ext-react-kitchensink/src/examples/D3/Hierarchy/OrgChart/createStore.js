export default function createStore() {
    return Ext.create('Ext.data.TreeStore', {
        root: {
            name: 'Cliff Capote',
            title: 'CEO',
            url: '1.jpg',
            expanded: true,
            children: [
                {
                    name: 'Rina Hohn',
                    title: 'Vice President, Engineering',
                    url: '4.jpg',
                    expanded: true,
                    children: [{
                        name: 'Edgardo Elvin',
                        title: 'Director of Engineering',
                        url: '2.jpg',
                        expanded: true,
                        children: [
                            {
                                name: 'Martin Patlan',
                                title: 'Sr. Software Architect',
                                url: '13.jpg'
                            },
                            {
                                name: 'Paola Motes',
                                title: 'Sr. Software Engineer',
                                url: '8.jpg'
                            },
                            {
                                name: 'Angelo Aden',
                                title: 'Sr. Software Engineer',
                                url: '12.jpg'
                            },
                            {
                                name: 'Christina Timmins',
                                title: 'Sr. Software Engineer',
                                url: '14.jpg'
                            },
                            {
                                name: 'Derrick Curtsinger',
                                title: 'Software Engineer',
                                url: '15.jpg'
                            }
                        ]
                    },  {
                        name: 'Freda Mcmurray',
                        title: 'Sr. Engineering Manager',
                        url: '9.jpg'
                    }]
                },
                {
                    name: 'Ramiro Frew',
                    title: 'Vice President, Marketing',
                    url: '5.jpg',
                    expanded: true,
                    children: [
                        {
                            name: 'Conrad Yohe',
                            title: 'Sr. Director, Product Management',
                            url: '3.jpg'
                        }
                    ]
                },
                {
                    name: 'Marita Meserve',
                    title: 'Senior Vice President and Chief Financial Officer',
                    url: '7.jpg'
                },
                {
                    name: 'Tory Orban',
                    title: 'Vice President, Global Alliances & Professional Services',
                    url: '10.jpg',
                    expanded: true,
                    children: [
                        {
                            name: 'Jarred Lasky',
                            title: 'Principal Architect',
                            url: '11.jpg'
                        }
                    ]
                }
            ]
        }        
    })
}