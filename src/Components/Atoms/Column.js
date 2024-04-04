import styled from "styled-components";
import { device } from "./Devices";

const Column = styled.div`
  width: ${(props) => props.width};
  margin-top: ${(props) => props.marginTop || "0px"};
  margin-bottom: ${(props) => props.marginBottom || "0px"};
  margin-left: ${(props) => props.marginLeft || "0px"};
  margin-right: ${(props) => props.marginRight || "0px"};
  text-align: ${(props) => props.textAlign || "left"};
  overflow: ${(props) => props.overflow || "visible"};

  @media ${device.tablet} {
    width: ${(props) => props.widthTablet || "90%"};
    margin-bottom: ${(props) =>
      props.marginBottomTablet || props.marginBottom || "0px"};
    margin-top: ${(props) => props.marginTopTablet || props.marginTop || "0px"};
    margin-left: ${(props) =>
      props.marginLeftTablet || props.marginLeft || "0px"};
    margin-right: ${(props) =>
      props.marginRightTablet || props.marginRight || "0px"};
  }

  @media ${device.mobile} {
    width: ${(props) => props.widthMobile || "90%"};
    margin-bottom: ${(props) =>
      props.marginBottomMobile ||
      props.marginBottomTablet ||
      props.marginBottom ||
      "0px"};
    margin-top: ${(props) =>
      props.marginTopMobile ||
      props.marginTopTablet ||
      props.marginBottom ||
      "0px"};
    margin-left: ${(props) =>
      props.marginLeftMobile ||
      props.marginLeftTablet ||
      props.marginLeft ||
      "0px"};
    margin-right: ${(props) =>
      props.marginRightMobile ||
      props.marginRightTablet ||
      props.marginRight ||
      "0px"};
  }
`;

export default Column;
