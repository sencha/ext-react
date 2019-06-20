import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-modern';

export default class InfiniteGridExample extends Component {
	render() {
		return(
			<Grid
				title="Infinite Grid"
				scrollable={true}
				height={500}
			    width={600}
			    plugins={
			    	{
			    		gridfilters: true
			    	}
			    }
			>
				<Column
					text="Author"
			       	width={150}
			        dataIndex="author"
				>
				</Column>
				<Column
					text="Forum Title"
			       	width={200}
			        dataIndex="forum_title"
				>
				</Column>
				<Column
					text="Forum Id"
			       	width={80}
			        dataIndex="forumid"
				>
				</Column>
				<Column
					text="Post Id"
			       	width={80}
			        dataIndex="post_id"
				>
				</Column>
				<Column
					text="Post Text"
			       	width={200}
			        dataIndex="post_text"
				>
				</Column>
				<Column
					text="Post Time"
			       	width={100}
			        dataIndex="post_time"
				>
				</Column>
				<Column
					text="Reply Count"
			       	width={80}
			        dataIndex="reply_count"
				>
				</Column>
				<Column
					text="Topic Id"
			       	width={100}
			        dataIndex="topic_id"
				>
				</Column>
				<Column
					text="Topic Title"
			       	width={200}
			        dataIndex="topic_title"
				>
				</Column>
			</Grid>
		)
	}
}