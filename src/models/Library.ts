
import { Family, IMonster, Monsters } from './Models';
import data from './Monsters.json';
export class Library {
  monsters: IMonster[] = [];

  cobiRecipeTrees: Map<Monsters, IRecipeTreeNode>;
  taraRecipeTrees: Map<Monsters, IRecipeTreeNode>;

  monstersFoundInTaraVersion: Monsters[];
  monstersFoundInCobiVersion: Monsters[];

  constructor() {
    this.monsters = data.monsters as unknown as IMonster[];
    this.monstersFoundInTaraVersion = data.monstersFoundInTaraVersion as unknown as Monsters[];
    this.monstersFoundInCobiVersion = data.monstersFoundInCobiVersion as unknown as Monsters[];


    this.cobiRecipeTrees = data.cobiRecipeTrees as unknown as Map<Monsters, IRecipeTreeNode>;
    this.taraRecipeTrees = data.taraRecipeTrees as unknown as Map<Monsters, IRecipeTreeNode>;
  }

  get(monster: Monsters | string): IMonster {
    return this.monsters.find(x => x.name.toString().toLowerCase() === monster.toString().toLowerCase())!;
  }
}

export interface IRecipeTreeNode {
  part: Monsters | Family;
  base?: IRecipeTreeNode;
  mate?: IRecipeTreeNode;
}

export const library: Library = new Library();