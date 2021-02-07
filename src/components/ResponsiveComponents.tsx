import styled from "styled-components";
import { useMediaQuery } from 'react-responsive';

export const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`

export const Column = styled.div<{span: number}>`
  float: left;
  width: 100%;
  padding: 15px;
  @media only screen and (min-width: 768px) {
    width: ${props => (props.span ? props.span / 12 * 100 : 8.33)}%;
  }
`

export const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
export const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}