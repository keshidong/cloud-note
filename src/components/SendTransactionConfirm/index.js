import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SendTransactionConfirm extends Component {
    state = {
        hashId: 'n1LkDi2gGMqPrjYcczUiweyP4RxTB6Go1qS',
        password: 'passphrase',
    }
    handleSendTransaction = () => {
        // todo
        const { hashId, password } = this.state;
        this.props.sendTransaction({
            address: hashId,
            passphrase: password,
        });
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {

        return (
            <Dialog
                open={this.props.open}
                modal={false}
                onRequestClose={this.props.onClose}
            >
                <TextField
                    name="hashId"
                    value={this.state.hashId}
                    onChange={this.handleInputChange}
                    hintText="Address"
                    floatingLabelText="Address"
                    style={{ width: '100%' }}
                />
                <TextField
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    hintText="Passphrase"
                    floatingLabelText="Passphrase"
                    type="password"
                    style={{ width: '100%' }}
                />
                <RaisedButton
                    style={{ marginTop: '20px' }}
                    keyboardFocused={true}
                    label="Send Transaction Confirm" primary={true} onClick={this.handleSendTransaction} />
            </Dialog>
        )
    }
}

export default SendTransactionConfirm;

