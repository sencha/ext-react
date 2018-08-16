import React from 'react';
import highlight from '../util/highlight';

export function createTpl({ getQuery, showTime=true, onFavoriteClick }) {
    return data => {
        const mark = (text) => {
            const query = getQuery();
            return query ? highlight(query, text) : { __html: text};
        }

        const day = data.date && data.date.match(/(Monday|Tuesday|Wednesday)/)[1];

        return (
            <div className="app-list-content">
                <div className="app-list-text">
                    <div className="app-list-item-title" dangerouslySetInnerHTML={mark(data.title)}/>
                    <div className="app-list-item-details">{data.speakerNames ? <span>by <span dangerouslySetInnerHTML={mark(data.speakerNames)}/></span> : ''}</div> 
                    <div className="app-list-item-details">{data.categoryName} - {data.location.name}</div>
                    { showTime && (<div className="app-list-item-details">{day} {data.start_time}</div>) }
                </div>
                { onFavoriteClick && (
                    <div 
                        onClick={e => {
                            Ext.get(e.target).ripple(e, { bound: false, color: '#999' })
                            onFavoriteClick(data)
                        }} 
                        data-favorite={data.favorite ? "on" : "off"}
                        className="x-item-no-tap x-font-icon md-icon-star app-list-tool app-favorite"
                    />
                )}
            </div>
        )
    }
}