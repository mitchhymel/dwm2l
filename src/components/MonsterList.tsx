import React from 'react';
import styled from 'styled-components';
import { library } from '../models/Library';
import { MonsterCard } from './MonsterCard';

const List = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 10px;
`


export const MonsterList = () => {
  const items: any = [];
  library.monsters.forEach(x => items.push(
    <MonsterCard monster={x} />
  ))

  return (
    <List>
      {items}
    </List>
  );
}

export default MonsterList;