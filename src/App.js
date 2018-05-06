import React, { Component } from 'react';
import {
    cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { fade } from 'material-ui/utils/colorManipulator';
import SubmitNote from './components/SubmitNote';
import SendTransactionConfirm from './components/SendTransactionConfirm';
import NoteRetrieval from './components/NoteRetrieval';
import { Neb, HttpRequest } from 'nebulas';
import config from './config';


const neb = new Neb();
const { contact_address, contact_host } = config;
// neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));

neb.setRequest(new HttpRequest(contact_host));


const muiTheme = getMuiTheme({
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    }
});

class App extends Component {
    state = {
        ifAccountDialogOpen: false,
        noteList: [],
    }
    handleSubmitNote = ({ title, content }) => {
        this.setState({
            ifAccountDialogOpen: true,
        });
        this.handleSendTransaction = ({ address, passphrase }) => {
            // send transaction
            // todo
            neb.api.getAccountState(address).then(function (state) {
                console.log(state);
                return state;
            })
                .catch(function (err) {
                    console.log("err:",err);
                })
                .then((state) => {
                    const { nonce } = state;
                    return neb.admin.sendTransactionWithPassphrase({
                        from: address,
                        to: contact_address,
                        value: 0,
                        contract: {
                            "function": "save",
                            "args": JSON.stringify([title, content, new Date().toString(), ""])
                        },
                        nonce: Number(nonce) + 1,
                        gasPrice: 1000000,
                        gasLimit: 2000000,
                        passphrase: passphrase
                    });
                })
                .then(function(tx) {
                    //code
                    console.log(tx);
                });
                this.setState({
                    ifAccountDialogOpen: false,
                });
        }
    }
    handleDialogHide = () => {
        this.setState({
            ifAccountDialogOpen: false,
        });
    }
    handleRetrieval = () => {
        this.setState({
            ifAccountDialogOpen: true,
        });
        this.handleSendTransaction = ({ address, passphrase }) => {
            // send transaction
            // get notes
            // todo
            neb.api.getAccountState(address).then(function (state) {
                console.log(state);
                return state;
            })
                .catch(function (err) {
                    console.log("err:",err);
                })
                .then((state) => {
                    const { nonce } = state;
                    return neb.api.call({
                        from: address,
                        to: contact_address,
                        value: 0,
                        contract: {
                            "function": "get",
                            "args": ""
                        },
                        nonce: Number(nonce) + 1,
                        gasPrice: 1000000,
                        gasLimit: 2000000,
                        passphrase: passphrase
                    });
                })
                .then((res) => {
                    //code
                    const list = JSON.parse(res.result).filter((el) => (el));
                    this.setState({
                        noteList: list,
                        ifAccountDialogOpen: false,
                    });
                });

        }
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Tabs>
                    <Tab
                        label="Note Save"
                    >
                        <div
                            style={{ padding: '20px' }}
                        >
                            <div
                                style={{
                                    fontSize: '24px',
                                    textAlign: 'center',
                                    marginTop: '40px',
                                    marginBottom: '40px',
                                }}
                            >Keep your IMPORTANT Info</div>
                            <SubmitNote
                                submit={this.handleSubmitNote}
                            />
                            <SendTransactionConfirm
                                open={this.state.ifAccountDialogOpen}
                                onClose={this.handleDialogHide}
                                sendTransaction={this.handleSendTransaction}
                            />
                        </div>
                    </Tab>
                    <Tab
                        label="Note Retrieval"
                    >
                        <NoteRetrieval
                            list={this.state.noteList}
                            onRetrieval={this.handleRetrieval}
                        />
                    </Tab>
                </Tabs>

            </MuiThemeProvider>
        )
    }
}

export default App;
