import { IMonster } from "../models/Models";
import styled from 'styled-components';
import { BorderedContainer } from './GenericComponents';

interface StatsComponentProps {
  monster: IMonster,
}

const Container = styled.div`
  text-align: left;
  justify-content: left;
  display: block-inline;
`

interface StatsProps {
  name: String,
  stat: number,
}

const StatBar = styled.div<{stat: number}>`
  display: inline-block;
  width: ${props => (props.stat/31)*100}%;
  background-color: ${props => {
    if (props.stat > 28) {
      return '#FF5722'
    }
    else if (props.stat > 20) {
      return '#FB8C00'
    }
    else if (props.stat > 10) {
      return '#FDD835'
    }
    else if (props.stat > 5) {
      return '#7CB342'
    }
    else {
      return '#388E3C';
    }
  }};
  text-align: left;
`

// const StatName = styled.div`
//   width: 75px;
//   display: inline-block;
// `

const StatDisplay = ({name, stat}: StatsProps) => (
  <div>
    <Container>
      {/* <StatName>{name}:</StatName> */}
      <StatBar stat={stat}>
        {name}: {stat}
      </StatBar>
    </Container>
  </div>
)

//for stats, 0 is poor, 15 is average, and 31 is good
// except for exp in which case 0 is good, 15 is average and 31 is bad

export const StatsComponent = ({monster}: StatsComponentProps) => (
  <BorderedContainer>
    <div>MaxLevel: {monster.maxLevel}</div>
    <StatDisplay name='Experience' stat={31-monster.experience} />
    <StatDisplay name='HP' stat={monster.hp} />
    <StatDisplay name='MP' stat={monster.mp} />
    <StatDisplay name='Attack' stat={monster.attack} />
    <StatDisplay name='Defence' stat={monster.defence} />
    <StatDisplay name='Agility' stat={monster.agility} />
    <StatDisplay name='Intelligence' stat={monster.intelligence} />
  </BorderedContainer>
)