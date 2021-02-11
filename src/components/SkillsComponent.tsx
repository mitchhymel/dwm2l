import { IMonster } from "../models/Models";
import { BorderedContainer } from './GenericComponents';

interface SkillsProps {
  monster: IMonster,
}

export const SkillsComponent = ({monster}: SkillsProps) => (
  <BorderedContainer>
    <h2>Skills</h2>
    {monster.skills.map(x => (
      <p>{x}</p>
    ))}
  </BorderedContainer>
)