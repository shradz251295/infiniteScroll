import React, { Component } from 'react';
import { AppBar, Avatar } from '@material-ui/core';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import PlaceholderLoader from '../comomon/placeholderLoader';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            images: []
        }
    }

    componentDidMount() {
        axios.get('https://randomuser.me/api/?seed=${seed}&page=${page}&results=30')
            .then((res) => {
                console.log(res.data);
                this.setState({ images: [...this.state.images, ...res.data.results] })
            })

    }

    getContactList = () => {
        setTimeout(() => {
            axios.get('https://randomuser.me/api/?seed=${seed}&page=${page}&results=30')
                .then((res) => {
                    console.log(res.data);
                    this.setState({ images: [...this.state.images, ...res.data.results] })
                })
        }, 100000)
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
                <div>
                    <AppBar style={{ textAlign: 'right', padding: '0 15px' }}>
                        <h3 onClick={() => this.handleLogout()}>LOGOUT</h3>
                    </AppBar>
                    <div style={{
                        display: 'flex',
                        margin: '0 auto',
                        width: '400px',
                        flexDirection: 'column',
                        height: "100", overflow: "auto"
                    }}
                    // id="scrollableDiv"  
                    >
                        <InfiniteScroll
                            dataLength={this.state.images.length}
                            next={this.getContactList}
                            hasMore={true}
                            loader={<PlaceholderLoader images={this.state.images} />}
                            scrollableTarget="scrollableDiv"
                        >
                            {this.state.images.map((k) =>
                                <div style={{
                                    display: 'flex'
                                }}>
                                    <Avatar src={k.picture.large} style={{ width: '100px', height: '100px' }} />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        paddingLeft: '20px'
                                    }}>
                                        <span>Name: {k.name.first} {k.name.last}</span>
                                        <span>{k.email}</span>
                                    </div>
                                </div>
                            )}
                        </InfiniteScroll>
                    </div>
                </div>
            )
        }
    }
}
export default withRouter(Home);