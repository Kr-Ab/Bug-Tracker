import styled from "styled-components";
export const Fade = styled.div`
 {
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn 1s;
  -moz-animation: fadeIn 1s;
  -o-animation: fadeIn 1s;
  -ms-animation: fadeIn 1s;
  }
  @keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
  }
  
  @-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
  }
  
  @-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
  }
  
  @-o-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
  }
  
  @-ms-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
  }
`;