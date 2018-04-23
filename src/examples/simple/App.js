import React, { Component } from 'react';
import { css } from 'glamor';

import Drawer, { POSITION_DISMISSED } from '../../sliderPoll/core/Drawer';
import SliderPoll from '../../sliderPoll/core/SliderPoll';
import { mediaQueries } from '../../sliderPoll/util';

import logo from './logo.svg';
import './App.css';

const drawerPosition = css({
    bottom: 0,
    left: 0,
    margin: '0 auto',
    position: 'fixed',
    right: 0,
    zIndex: 1,
    [mediaQueries.tablet]: {
        left: 0,
        margin: '0 2rem 0 auto',
    },
    [mediaQueries.laptop]: {
        left: 'calc(30rem - 20px)',
        margin: '0 auto',
    },
});

const poll = {
    like: true,
};

class App extends Component {
    state = {
        poll: {
            like: null,
        },
    };

    handleSaveStep = poll => {
        this.setState({ poll });
        return Promise.resolve();
    };

    render() {
        const poll = this.state.poll;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <section>{JSON.stringify(poll)}</section>
                <Drawer
                    style={drawerPosition}
                    defaultPosition={POSITION_DISMISSED}
                >
                    <SliderPoll
                        poll={poll}
                        handleSaveStep={this.handleSaveStep}
                    />
                </Drawer>
            </div>
        );
    }
}

export default App;
