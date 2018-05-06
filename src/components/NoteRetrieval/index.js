import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import NoteList from '../NoteList';


class NoteRetrieval extends Component {
    render() {
        return (
            <div style={{ marginTop: '40px' }}>
                {
                    this.props.list.length !== 0
                        ? <NoteList list={this.props.list} />
                        : <RaisedButton label="Retrieval NOW" onClick={this.props.onRetrieval}/>
                }
            </div>
        );
    }
}

NoteRetrieval.defaultProps = {
    list: [],
    onRetrieval: () => {},
};

export default NoteRetrieval;
