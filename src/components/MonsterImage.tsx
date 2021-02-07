import { Monsters } from "../models/Models";

type MonsterImageProps = {
  monster: Monsters;
  isPsx?: boolean;
}

export const MonsterImage = ({monster, isPsx=true}: MonsterImageProps) => (
  <div>
    <img alt={monster.toString()} src={`./assets/${isPsx ? 'psx' : 'gbc'}/${monster.toString()}.${isPsx ? 'gif' : 'png'}`}/>
  </div>
);