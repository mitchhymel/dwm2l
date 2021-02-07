import React from 'react';
import { IMonster, IRecipe } from '../models/Models';
import styled from 'styled-components';
import { MonsterImage } from './MosnterImage';

interface MonsterCardProps {
  monster: IMonster,
}

const ListItem = styled.li`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  padding: 2px 16px;
`

interface RecipeItemProps {
  recipe: IRecipe;
}
const RecipeItem = ({recipe}: RecipeItemProps) => (
  <div>
    {recipe.base} + {recipe.mate} = {recipe.result}
  </div>
);

interface RecipeListProps {
  recipes: IRecipe[];
}
const RecipeList = ({recipes}: RecipeListProps) => {
  const items: any = [];
  recipes.forEach(x => items.push(
    <RecipeItem recipe={x}/>
  ))

  return (
    <ul>
      {items}
    </ul>
  );  
}

export const MonsterCard = ({monster}: MonsterCardProps) => (
  <ListItem>
    <div>{monster.name} - {monster.family}</div>
    <MonsterImage monster={monster} isPsx />
    <RecipeList recipes={monster.recipes}/>
  </ListItem>
);