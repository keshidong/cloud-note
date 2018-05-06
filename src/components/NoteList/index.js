import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const NoteCard = ({ title, date, content, style }) => (
    <Card
        style={style}
    >
        <CardHeader
            title={title}
            subtitle={`create time: ${date}`}
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardText expandable={true}>
            {content}
        </CardText>
    </Card>
);

const NoteList = ({ list }) => (
    list.map((note, index) => (
        <NoteCard
            key={index}
            style={{ marginBottom: '20px' }}
            {...note}
        />
    ))
);

export default NoteList;
