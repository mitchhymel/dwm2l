import React from 'react';
import { library } from '../models/Library';
import { Family, IMonster, Monsters } from '../models/Models';
import { MonsterList } from './MonsterList';

interface FamilyListProps {
  family: Family;
}

export const FamilyList = ({family}: FamilyListProps) => {
  let items: IMonster[] = [];
  for (let x of library.monsters.values()) {
    if (x.family === family) {
      items.push(x);
    }
  }

  return (
    <MonsterList monsters={items}/>
  )
}