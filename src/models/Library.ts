
import { IMonster, Monsters } from './Models';
import data from './Monsters.json';
export class Library {
  monsters: IMonster[] = [];

  constructor() {
    this.monsters = data.monsters as unknown as IMonster[];
  }

  get(monster: Monsters | string): IMonster {
    return this.monsters.find(x => x.name.toString().toLowerCase() === monster.toString().toLowerCase())!;
  }
}

export const library: Library = new Library();