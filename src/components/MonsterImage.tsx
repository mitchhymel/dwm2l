import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Monsters } from "../models/Models";

const Image = styled.img<{isPsx: boolean}>`
  min-height: ${props => props.isPsx ? null : '45px'};
  min-width: ${props => props.isPsx ? null : '45px'};
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
      <Image isPsx={isPsx} alt={monster.toString()} src={`/dwm2l/assets/${isPsx ? 'psx' : 'gbc'}/${monster.toString().toLowerCase()}.${isPsx ? 'gif' : 'png'}`}
        onClick={() => history.push(`/monster/${monster.toString()}`)}
      />
    </div>
  )
};