import { IMonster } from "../models/Models";
import { RecipeTreeNode } from "./RecipeTreeNode";

interface RecipeTreeProps {
  monster: IMonster;
}

export const RecipeTree = ({monster}: RecipeTreeProps) => (
  <RecipeTreeNode part={monster.name} />
)