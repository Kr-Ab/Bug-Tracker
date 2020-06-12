import React from 'react'
import { Fade } from '../../animations/fade'

export default function Wrapper(props) {
    return (
        <Fade className="wrapper">
            {props.children}
        </Fade>
    )
}
