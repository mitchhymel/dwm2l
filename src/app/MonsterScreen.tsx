import React from 'react';
import { MonsterCard } from '../components/MonsterCard';
import { library } from '../models/Library';
import { Monsters } from '../models/Models';

interface MonsterScreenProps {
  monster: Monsters;
}

export const MonsterScreen = (props: MonsterScreenProps | any) => {
  let mon = props.monster;
  if (mon === undefined) {
    mon = props.match.params.monster;
  }
  let monster = library.get(mon);
  return (
    <MonsterCard monster={monster} />
  );
}
