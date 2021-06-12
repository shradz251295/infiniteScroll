import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';

class PlaceholderLoader extends Component {
    render() {
        return (
                <ContentLoader primaryColor="#ccc" 
                height="100px"     
                backgroundColor={'#e7e7e7'}
                foregroundColor={'#f1f1f1'} >
                    <circle cx="50" cy="50" r="25" stroke="black" stroke-width="3" />
                    <rect x="80" y="40" rx="3" ry="3" width="320" height="10" />
                    <rect x="80" y="60" rx="3" ry="3" width="320" height="8" />
                </ContentLoader>
        )
    }
}
export default PlaceholderLoader;