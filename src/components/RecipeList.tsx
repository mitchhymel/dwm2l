
import styled from "styled-components";
import { IRecipe, RecipeComponentType } from "../models/Models";
import { RecipeListItem } from './RecipeListItem';
import { BorderedContainer } from './GenericComponents';


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
    <BorderedContainer>
      <h3>{as}</h3>
      <ul>
        {items}
      </ul>
    </BorderedContainer>
  );  
}