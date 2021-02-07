import { IMonster } from "../models/Models";

interface MonsterImageProps {
  monster: IMonster;
  isPsx: boolean;
}

export const MonsterImage = ({monster, isPsx}: MonsterImageProps) => (
  <div>
    <img alt={monster.name.toString()} src={`./assets/${isPsx ? 'psx' : 'gbc'}/${monster.name}.${isPsx ? 'gif' : 'png'}`}/>
  </div>
);