import React from 'react';
import styled from 'styled-components';
import { IMonster, Monsters } from '../models/Models';
import { MonsterListItem } from './MonsterListItem';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 5px;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

interface MonsterListProps {
  monsters: IMonster[];
}

export const MonsterList = ({monsters}: MonsterListProps) => {
  let items: IMonster[] = monsters.sort((a, b) => {
    const order = Object.values(Monsters);
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return (
    <Wrapper>
      {items.map(x => (
        <MonsterListItem monster={x} />
      ))}
    </Wrapper>
  )
}