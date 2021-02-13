import React, { useState } from 'react';
import styled from 'styled-components';
import { MonsterList } from '../components/MonsterList';
import { library } from '../models/Library';
import { IMonster } from '../models/Models';

const Input = styled.input`
  position: fixed;
  z-index: 3;
  background-color: #263238;
  color: white;
  width: 100%;
  bottom: 0;
  height: 50px;
  text-align: center;
  border: 0;
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
