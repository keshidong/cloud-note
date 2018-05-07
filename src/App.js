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
import NoteRetrieval from './components/NoteRetrieval';
import NebPay from './libs/nebPay';
import AppInfo from './components/AppInfo';
import config from './config';

const nebPay = new NebPay();
const { contact_address } = config;

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
    }
    handleSubmitNote = ({ title, content }) => {
        nebPay.call(contact_address, 0, "save", JSON.stringify([title, content, new Date().toString(), ""]),
            {
                qrcode: {
                    showQRCode: false,
                },
                //set listener for extension transaction result
                listener: (resp) => {
                    console.log(resp);
                }
            },
        );
    }
    handleRetrieval = () => {
        return new Promise((resolve) => {
            nebPay.simulateCall(contact_address, 0, 'get', '', {
                qrcode: {
                    showQRCode: false
                },
                listener: (res) => {
                    const list = JSON.parse(res.result).filter((el) => (el));
                    resolve(list);
                }
            });
        })

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
                        </div>
                    </Tab>
                    <Tab
                        label="Note Retrieval"
                    >
                        <NoteRetrieval
                            onRetrieval={this.handleRetrieval}
                        />
                    </Tab>
                </Tabs>
                <AppInfo />
            </MuiThemeProvider>
        )
    }
}

export default App;
