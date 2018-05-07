import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import NoteList from '../NoteList';


class NoteRetrieval extends Component {
    state = {
        loading: false,
        list: [],
    }
    handleRetrieval = () => {
        this.setState({
            loading: true,
        });
        this.props.onRetrieval()
            .then((list) => {
                console.log(list)
                this.setState({
                    list,
                    loading: false,
                });
            })
    }
    render() {
        return (
            <div style={{ padding: '20px' }}>
                <NoteList list={this.state.list} />

                <div style={{ textAlign: 'center'}}>
                    <RaisedButton label="Retrieval NOW" onClick={this.handleRetrieval} >
                        {
                            this.state.loading
                                ? <CircularProgress size={24} />
                                : null
                        }
                    </RaisedButton>
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
