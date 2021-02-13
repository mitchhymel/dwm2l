import React, { useState } from 'react';
import styled from 'styled-components';
import { MonsterList } from '../components/MonsterList';
import { library } from '../models/Library';
import { IMonster } from '../models/Models';

const Input = styled.input`
  position: fixed;
  z-index: 3;
  background-color: black;
  color: white;
  width: 99%;
  bottom: 0;
  height: 40px;
  text-align: center;
`

export const MainScreen= () => {
  const [filter, setFilter] = useState('');

  const monsters: IMonster[] = [];
  library.monsters.forEach(x => {
    if (x.name.toString().toLowerCase().includes(filter.toLowerCase())) {
      monsters.push(x);
    }
  });
  return (
    <div>
      <Input onChange={x => setFilter(x.target.value)} placeholder='Filter by name'/>
      <MonsterList monsters={monsters}/>
      <div style={{height: '50px'}} />
    </div>
  );
}
