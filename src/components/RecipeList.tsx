
import { IRecipe, RecipeComponentType } from "../models/Models";
import { RecipeListItem } from './RecipeListItem';

interface RecipeListProps {
  recipes: IRecipe[];
  as: RecipeComponentType;
}
export const RecipeList = ({recipes, as}: RecipeListProps) => {
  const items: any = [];
  recipes.forEach(x => items.push(
    <RecipeListItem recipe={x} as={as}/>
  ))

  return (
    <div>
      <h3>{as}</h3>
      <ul>
        {items}
      </ul>
    </div>
  );  
}