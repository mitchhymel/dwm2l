import { Monsters } from "../models/Models";

type MonsterImageProps = {
  monster: Monsters;
  isPsx?: boolean;
}

export const MonsterImage = ({monster, isPsx=true}: MonsterImageProps) => (
  <div>
    <img alt={monster.toString()} src={`/dwm2l/assets/${isPsx ? 'psx' : 'gbc'}/${monster.toString().toLowerCase()}.${isPsx ? 'gif' : 'png'}`}/>
  </div>
);