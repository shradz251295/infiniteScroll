import React, { Component } from 'react';
import { AppBar, Avatar, createMuiTheme, MuiThemeProvider, Divider } from '@material-ui/core';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import PlaceholderLoader from '../comomon/placeholderLoader';
import { getUserDetails } from '../../services/service';

const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            root: {
                zIndex: '-1100'
            }
        }
    }
})

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            userData: []
        }
        this.showContactList = this.showContactList.bind(this);
        this.getContactList = this.getContactList.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.showContactList();
    }

    showContactList = () => {
        getUserDetails()
            .then((res) => {
                // console.log(res);
                this.setState({ userData: [...this.state.userData, ...res.results] })
            })
    }

    getContactList = () => {
        setTimeout(() => {
            this.showContactList();
        }, 1000)
    }

    handleLogout() {
        localStorage.removeItem('authenticated_user');
        this.props.history.push('/login');
    }

    render() {
        if (localStorage.getItem('authenticated_user') === null) {
            return <Redirect to='/login' />
        }
        else {
            return (
                <MuiThemeProvider theme={theme}>
                    <AppBar className="common_appbar"
                        style={{ textAlign: 'right', padding: '0 15px' }}
                    >
                        <h3>CONTACTS</h3>
                        <h4 style={{ cursor: 'pointer' }} onClick={() => this.handleLogout()}>LOGOUT</h4>
                    </AppBar>
                    <div className="home_page_background home_appbar"
                        id="scrollableDiv"
                    >
                        <form className="user_list">
                            <InfiniteScroll
                                dataLength={this.state.userData.length}
                                next={this.getContactList}
                                hasMore={true}
                                loader={<PlaceholderLoader userData={this.state.userData} />}
                                scrollableTarget="scrollableDiv"
                            >
                                {this.state.userData.map((k) =>
                                    <div className="user_profile">
                                        <div style={{
                                            display: 'flex',
                                            padding: '10px 0'
                                        }}>
                                            <Avatar src={k.picture.large} style={{ width: '60px', height: '60px' }} />
                                            <div className="user_details">
                                                <span>{k.name.first} {k.name.last}</span>
                                                <span>{k.email}</span>
                                            </div>

                                        </div>
                                        <Divider variant="light" />
                                    </div>
                                )}

                            </InfiniteScroll>
                        </form>
                    </div>
                </MuiThemeProvider >
            )
        }
    }
}
export default withRouter(Home);