import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { Monsters } from "../models/Models";

const Image = styled.img<{isPsx: boolean, clickNav: boolean}>`
  min-height: ${props => props.isPsx ? null : '45px'};
  min-width: ${props => props.isPsx ? null : '45px'};
  
  ${props => props.clickNav && css`
    :hover {
      cursor: pointer;
    }
  `}
`

type MonsterImageProps = {
  monster: Monsters;
  isPsx?: boolean;
  clickNav?: boolean;
}

export const MonsterImage = ({monster, isPsx=true, clickNav=true}: MonsterImageProps) => {
  
  let history = useHistory();
  return (
    <div>
      <Image clickNav={clickNav} isPsx={isPsx} alt={monster.toString()} src={`/dwm2l/assets/${isPsx ? 'psx' : 'gbc'}/${monster.toString().toLowerCase()}.${isPsx ? 'gif' : 'png'}`}
        onClick={() => {if (clickNav) history.push(`/monster/${monster.toString()}`)}}
      />
    </div>
  )
};