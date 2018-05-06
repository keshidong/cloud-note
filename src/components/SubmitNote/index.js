import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SubmitNote extends Component {
    state = {
        title: '',
        content: '',
    }
    handleClick = () => {
        const { title, content } = this.state;
        this.props.submit({
            title,
            content,
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {
        return (
            <div>
                <TextField
                    name="title"
                    hintText="Please enter a title"
                    floatingLabelText="Note Title"
                    value={this.state.title}
                    onChange={this.handleChange}

                />
                <TextField
                    name="content"
                    hintText="Note content"
                    multiLine={true}
                    rows={2}
                    rowsMax={6}
                    value={this.state.content}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                />
                <RaisedButton
                    style={{ marginTop: '20px' }}
                    label="Save Note" primary={true} onClick={this.handleClick} />
            </div>
        );
    }
}

export default SubmitNote;