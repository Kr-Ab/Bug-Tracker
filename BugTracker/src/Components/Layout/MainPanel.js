import React from "react";
import { Fade } from '../../animations/fade'

export default function MainPanel(props) {
  return <Fade className="main-panel">{props.children}</Fade>;
}
