import { useHistory } from "react-router-dom";
import styled from "styled-components"


const Bar = styled.div`
  position: fixed;
  z-index: 2;
  background-color: #263238;
  width: 100%;
  top: 0px;
  text-align: center;
  padding: 10px;
`

const Icon = styled.svg`
  margin: auto;
  :hover {
    cursor: pointer;
  }
`

export const AppBar = () => {
  let history = useHistory();
  return (
    <div>
      <Bar onClick={() => history.push(`/`)}>
        <Icon xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill='#ffffff'/></Icon>
      </Bar>
      <div style={{height: '48px'}}/>
    </div>
  );
}