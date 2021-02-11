import React from 'react';
import { IMonster, RecipeComponentType } from '../models/Models';
import styled from 'styled-components';
import { MonsterImage } from './MonsterImage';
import { RecipeList } from './RecipeList';
import { Row, Column } from './ResponsiveComponents';

const Container = styled.div`
  text-align: center;
  justify-content: center;
`

interface MonsterCardProps {
  monster: IMonster,
}

const LocationComponent = ({monster}: MonsterCardProps) => (
  <div>
    <p>{monster.locations}</p>
    <p>Tara Only: {monster.taraLocations}</p>
    <p>Cobi Only: {monster.cobiLocations}</p>
  </div>
)

const StatsComponent = ({monster}: MonsterCardProps) => (
  <div>
    <p>{monster.hp}, {monster.mp}</p>
  </div>
)

const SkillsComponent = ({monster}: MonsterCardProps) => (
  <div>
    {monster.skills.map(x => (
      <p>{x}</p>
    ))}
  </div>
)

export const MonsterCard = ({monster}: MonsterCardProps) => (
  <Container>
    <h1>{monster.name} - {monster.family}</h1>
    <MonsterImage monster={monster.name} />
    <StatsComponent monster={monster} />
    <LocationComponent monster={monster} />
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