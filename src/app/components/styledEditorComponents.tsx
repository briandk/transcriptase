// import React, {Props} from "react"
// import styled, {CreateStyled} from "react-emotion"
// import  style from "glamor";

// interface CustomProps {
//   reversed: boolean,
//   active: boolean
// }

// // const button: CreateStyled<CustomProps & React.HTMLProps<HTMLButtonElement>> = styled("span")

// const button = styled.span<{color?: string, reversed?: boolean, active: boolean}>`
//   cursor: pointer;
//   color: ${props =>
//   props.reversed ? (props.active ? "white" : "#aaa") : props.active ? "black" : "#ccc"};
// `

// export const Icon1 = styled(({className: string, ...rest}) => {return <span className={`material-icons ${className}`} {...rest} />
// })`
//   font-size: 18px;
//   vertical-align: text-bottom;
// `})

// export const Icon = styled(({ className?, any[] }) => {
//   return <span className={`material-icons ${className}`} {...rest} />
// })`
//   font-size: 18px;
//   vertical-align: text-bottom;
// `

// export const Menu = styled("div")`
//   & > * {
//     display: inline-block;
//   }
//   & > * + * {
//     margin-left: 15px;
//   }
// `

// export const Toolbar = styled(Menu)`
//   position: relative;
//   padding: 1px 18px 17px;
//   margin: 0 -20px;
//   border-bottom: 2px solid #eee;
//   margin-bottom: 20px;
// `
