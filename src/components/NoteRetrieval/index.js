import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import NoteList from '../NoteList';


class NoteRetrieval extends Component {
    render() {
        return (
            <div style={{ marginTop: '40px' }}>
                <NoteList list={this.props.list} />

                <div style={{ textAlign: 'center'}}>
                    <RaisedButton label="Retrieval NOW" onClick={this.props.onRetrieval}/>
                </div>
            </div>
        );
    }
}

NoteRetrieval.defaultProps = {
    list: [],
    onRetrieval: () => {},
};

export default NoteRetrieval;
