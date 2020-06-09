import React, { Component } from 'react'

export class dashboard extends Component {
    render() {
        return (
            <div>
                Basic DashBoard - {this.props.role}
            </div>
        )
    }
}

export default dashboard
