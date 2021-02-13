import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Family, getColorFromFamily, IMonster } from '../models/Models';
import { MonsterImage } from './MonsterImage';

const Card = styled.div<{family: Family}>`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  /* color: ${props => getColorFromFamily(props.family)}; */

  background-color: ${props => getColorFromFamily(props.family)};
  color: white;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    cursor: pointer;
    /* background-color: ${props => getColorFromFamily(props.family)};
    color: white; */
    background-color: white;
    color: ${props => getColorFromFamily(props.family)};
  }

  padding: 5px;
  min-width: 75px;
  min-height: 125px;
  position:relative;
  text-align: center;
  display:flex;
  justify-content: center;
  align-items: center;

  border-style: solid;
  border-radius: 4px;
  border-color: ${props => getColorFromFamily(props.family)};
`

const Name = styled.div`
  position:absolute;
  bottom:0;
`

interface MonsterListItemProps {
  monster: IMonster;
}

export const MonsterListItem = ({monster}: MonsterListItemProps) => {
  let history = useHistory();
  return (
    <Card family={monster.family} onClick={() => history.push(`/monster/${monster.name.toString()}`)}>
      <MonsterImage monster={monster.name} />
      <Name>{monster.name}</Name>
    </Card>
  );
};