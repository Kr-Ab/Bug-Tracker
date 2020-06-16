import React from 'react'
import { Fade } from '../../animations/fade'

export default function Wrapper(props) {
    return (
        <div className="wrapper">
            {props.children}
        </div>
    )
}
