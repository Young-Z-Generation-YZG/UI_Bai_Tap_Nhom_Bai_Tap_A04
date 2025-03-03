import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props:any) => (
  <Svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3 12L10 3L10 7.98961L21 8V16H10V21L3 12Z"
      stroke="#000000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
