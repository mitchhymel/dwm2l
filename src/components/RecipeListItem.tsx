import styled from "styled-components";
import { Family, IRecipe, isMonster, Monsters, RecipeComponentType } from "../models/Models";
import { MonsterImage } from "./MonsterImage";

const RecipeRow = styled.div`
  * {
    display:inline-block;
  }
`

interface RecipeListItemProps {
  recipe: IRecipe;
  as: RecipeComponentType;
}

export const RecipeListItem = ({recipe, as}: RecipeListItemProps) => (
  
  <div>
    {as === RecipeComponentType.Result ?
      <RecipeRow>
        <RecipeComponent part={recipe.base}/> + <RecipeComponent part={recipe.mate}/>
      </RecipeRow>
    : 
      <RecipeRow>
        <RecipeComponent part={recipe.base}/> + <RecipeComponent part={recipe.mate}/> = <RecipeComponent part={recipe.result} />
      </RecipeRow>
    }
    
  </div>
);

interface RecipeComponentProps {
  part: Monsters | Family;
}

export const RecipeComponent = ({part}: RecipeComponentProps) => {
  if (isMonster(part)) {
    const monster = part as Monsters;
    return <MonsterImage monster={monster}/>
  } else {
    return <div>{part}</div>
  }
};