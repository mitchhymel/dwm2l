import { useHistory } from "react-router-dom";
import styled from "styled-components"


const Bar = styled.div`
  position: fixed;
  z-index: 2;
  background-color: black;
  color: white;
  width: 100%;
  top: 0;
  height: 40px;
  text-align: center;
`

export const AppBar = () => {
  let history = useHistory();
  return (
    <div>
      <Bar onClick={() => history.push(`/`)}>
        Back to Home screen
      </Bar>
      <div style={{height: '40px'}}/>
    </div>
  );
}