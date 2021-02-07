import React from 'react';
import { IMonster, RecipeComponentType } from '../models/Models';
import styled from 'styled-components';
import { MonsterImage } from './MonsterImage';
import { RecipeList } from './RecipeList';
import { Row, Column } from './ResponsiveComponents';

const ListItem = styled.li`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  padding: 2px 16px;
`

interface MonsterCardProps {
  monster: IMonster,
}


export const MonsterCard = ({monster}: MonsterCardProps) => (
  <ListItem>
    <h1>{monster.name} - {monster.family}</h1>
    <MonsterImage monster={monster.name} />
    <Row>
      <Column span={2}>
        <RecipeList recipes={monster.recipes} as={RecipeComponentType.Result}/>
      </Column>
      <Column span={4}>
        <RecipeList recipes={monster.asBase} as={RecipeComponentType.Base}/>
      </Column>
      <Column span={4}>
        <RecipeList recipes={monster.asMate} as={RecipeComponentType.Mate}/>
      </Column>
    </Row>
  </ListItem>
);