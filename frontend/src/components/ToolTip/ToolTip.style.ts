import styled from 'styled-components';

export const ToolTipText = styled.span<{ color: string, bgcolor: string }>`
  visibility: hidden;
  width: 120px;
  background-color: ${props => props.color};
  color: ${props => props.bgcolor};
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 10;
  bottom: 115%;
  left: 50%;
  margin-left: -60px;
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${props => props.color} transparent transparent transparent;
  }
`;

// export const ToolTipText = styled("span")({
//   visibility: "hidden",
//   width: "120px",
//   backgroundColor: "#000",
//   color: "#000",
//   textAlign: "center",
//   borderRadius: "6px",
//   padding: "5px 0",
//   position: "absolute",
//   zIndex: 10,
//   bottom: "115%",
//   left: "50%",
//   marginLeft: "-60px",
//   "&:after": {
//     content: '""',
//     position: "absolute",
//     top: "100%",
//     left: "50%",
//     marginLeft: "-5px",
//     borderWidth: "5px",
//     borderStyle: "solid",
//     borderColor: `black transparent transparent transparent`
//   }
// });

export const ToolTip = styled("div")({
  position: "relative",
  display: "inline-block",
  // borderBottom: "1px dotted black",
  ":hover span": {
    visibility: "visible"
  }
});
