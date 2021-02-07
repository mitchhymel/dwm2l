import React from 'react';
import { library } from '../models/Library';
import { Family, IMonster, Monsters } from '../models/Models';
import { MonsterList } from './MonsterList';

interface FamilyListProps {
  family: Family;
}

export const FamilyList = ({family}: FamilyListProps) => {
  let items: IMonster[] = [];
  library.monsters.forEach(x => {
    if (x.family === family) {
      items.push(x);
    }
  })

  items = items.sort((a, b) => {
    const order = Object.values(Monsters);
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return (
    <div>
      <h1>{family}</h1>
      <MonsterList monsters={items} />
    </div>
  );
}

export default FamilyList;