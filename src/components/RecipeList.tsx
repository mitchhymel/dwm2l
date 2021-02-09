
import styled from "styled-components";
import { IRecipe, RecipeComponentType } from "../models/Models";
import { RecipeListItem } from './RecipeListItem';



const RecipeListContainer = styled.div`
  border-radius: 4px;
  border-width: 4px;
  border-color: black;
  border-style: solid;
  margin: -10px;
  padding: 5px;
`

interface RecipeListProps {
  recipes: IRecipe[];
  as: RecipeComponentType;
}
export const RecipeList = ({recipes, as}: RecipeListProps) => {
  const items: any = [];
  recipes.forEach(x => items.push(
    <RecipeListItem recipe={x} as={as}/>
  ));

  return (
    <RecipeListContainer>
      <h3>{as}</h3>
      <ul>
        {items}
      </ul>
    </RecipeListContainer>
  );  
}