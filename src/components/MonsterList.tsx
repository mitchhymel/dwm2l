import React from 'react';
import styled from 'styled-components';
import { IMonster } from '../models/Models';
import { MonsterCard } from './MonsterCard';

const List = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin: 10px;
  padding-left: 0;
`

interface MonsterListProps {
  monsters: IMonster[];
}

export const MonsterList = ({monsters} : MonsterListProps) => {
  const items: any = [];
  monsters.forEach(x => items.push(
    <MonsterCard monster={x} />
  ))

  return (
    <List>
      {items}
    </List>
  );
}