import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Monsters } from "../models/Models";

const Image = styled.img`
  :hover {
    cursor: pointer;
  }
`

type MonsterImageProps = {
  monster: Monsters;
  isPsx?: boolean;
}

export const MonsterImage = ({monster, isPsx=true}: MonsterImageProps) => {
  
  let history = useHistory();
  return (
    <div>
      <Image alt={monster.toString()} src={`/dwm2l/assets/${isPsx ? 'psx' : 'gbc'}/${monster.toString().toLowerCase()}.${isPsx ? 'gif' : 'png'}`}
        onClick={() => history.push(`/monster/${monster.toString()}`)}
      />
    </div>
  )
};