import React, { useState } from 'react';
import styled from 'styled-components';
import { library } from '../models/Library';
import { Family, getColorFromFamily, Monsters, isFamily } from '../models/Models';
import { MonsterImage } from './MonsterImage';

const Card = styled.div<{family: Family}>`

  background-color: ${props => getColorFromFamily(props.family)};
  color: white;

  width: 100%;
  height: 150px;
  position:relative;
  text-align: center;
  display:flex;
  justify-content: center;
  align-items: center;
`

const Select = styled.select`
  position: absolute;
  bottom:0;
`

const ChildContainer = styled.div`
  width: 100%;
  display: inline-block;
`

const Child = styled.div`
  height: 50%;
  width: 50%;
  display: inline-block;
  vertical-align: top;
  
  * {
    :hover {
      z-index: 5;
    }
  }
`

const FamilyNode = styled.div<{family: Family}>`
  background-color: ${props => getColorFromFamily(props.family)};
  height: 150px;
  width: 100%;
  color: white;
  text-align: center;

  * {
    :hover {
      z-index: 5;
    }
  }
`


interface RecipeTreeNodeProps {
  part: Monsters | Family;
}

export const RecipeTreeNode = ({part}: RecipeTreeNodeProps) => {
  const [recipeIndex, setRecipeIndex] = useState(-1);

  if (isFamily(part)) {
    const fam = part as Family;
    return (
      <FamilyNode family={fam}>
        {part}
      </FamilyNode>
    );
  }

  const monster = library.get(part);

  // TODO: still a bug here :/ need to reset index
  // if a selection in a parent node was changed

  return (
    <div>
      <Card family={monster.family}>
        <MonsterImage monster={monster.name} clickNav={false} />
        <Select onChange={x => setRecipeIndex(parseInt(x.target.value))}>
          <option value={-1}>none</option>
          {monster.recipes.map(x => (
            <option value={monster.recipes.indexOf(x)}>{x.base} + {x.mate}</option>
          ))}
        </Select>
      </Card>
    
      
      {recipeIndex !== -1 && 
      <ChildContainer>
        <Child>
          <RecipeTreeNode part={monster.recipes[recipeIndex].base} />
        </Child> 
        <Child>
          <RecipeTreeNode part={monster.recipes[recipeIndex].mate} />
        </Child>
      </ChildContainer>}
    </div>
  );
};