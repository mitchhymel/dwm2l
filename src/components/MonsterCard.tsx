import React from 'react';
import { Family, IMonster, RecipeComponentType } from '../models/Models';
import styled from 'styled-components';
import { MonsterImage } from './MonsterImage';
import { RecipeList } from './RecipeList';
import { Row, Column } from './ResponsiveComponents';
import { StatsComponent } from './StatsComponent';
import { LocationsComponent } from './LocationsComponent';
import { SkillsComponent } from './SkillsComponent';

const Container = styled.div`
  text-align: center;
  justify-content: center;
`

interface MonsterCardProps {
  monster: IMonster,
}



export const MonsterCard = ({monster}: MonsterCardProps) => (
  <Container>
    <h1>{monster.name} - {monster.family}</h1>
    <MonsterImage monster={monster.name} />
    <StatsComponent monster={monster} />
    <LocationsComponent monster={monster} />
    <SkillsComponent monster={monster} />
    <Row>
      <Column span={4}>
        <RecipeList recipes={monster.recipes} as={RecipeComponentType.Result}/>
      </Column>
      <Column span={4}>
        <RecipeList recipes={monster.asBase} as={RecipeComponentType.Base}/>
      </Column>
      <Column span={4}>
        <RecipeList recipes={monster.asMate} as={RecipeComponentType.Mate}/>
      </Column>
    </Row>
  </Container>
);