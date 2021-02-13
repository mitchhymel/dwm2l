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

const CircleChart = styled.div`
  border-radius: 100%;
  background: purple;
  width: 100px;
  height: 100px;
  position: relative;
`

const ChartSegment = styled.div<{offset: number, value: number}>`
  height: 100%;
  position: absolute;
  transform: translate(0, -50%) rotate(90deg) rotate(calc(${props => props.offset}* 1deg));
  transform-origin: 50% 100%;
  width: 100%;
  overflow: hidden;
  
  :before {
    background: rgba(255,0,0,.5);
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    transform: translate(0, 100%) rotate(calc(${props => props.value} * 1deg));
    transform-origin: 50% 0;
  }
`

//for stats, 0 is poor, 15 is average, and 31 is good
// except for exp in which case 0 is good, 15 is average and 31 is bad

export const StatsComponent = ({monster}: StatsComponentProps) => (
  <BorderedContainer>
    <div>MaxLevel: {monster.maxLevel}</div>
    {/* <CircleChart>
      <ChartSegment offset={0} value={60}/>
      <ChartSegment offset={90} value={90}/>
    </CircleChart> */}
    <StatDisplay name='Experience' stat={31-monster.experience} />
    <StatDisplay name='HP' stat={monster.hp} />
    <StatDisplay name='MP' stat={monster.mp} />
    <StatDisplay name='Attack' stat={monster.attack} />
    <StatDisplay name='Defence' stat={monster.defence} />
    <StatDisplay name='Agility' stat={monster.agility} />
    <StatDisplay name='Intelligence' stat={monster.intelligence} />
  </BorderedContainer>
)