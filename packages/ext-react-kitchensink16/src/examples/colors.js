const cardDefaults = {
    fontSize: '16px',
    padding: '10px'
};

export default {
    card: {
        blue: {
            ...cardDefaults,
            backgroundColor: '#673ab7', 
            color: 'white'
        },
        green: {
            ...cardDefaults,
            backgroundColor: '#7c4dff', 
            color: 'white'
        },
        red: {
            ...cardDefaults,
            backgroundColor: '#00bcd4', 
            color: 'white'
        }
    }
};