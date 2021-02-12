import { IMonster } from "../models/Models";
import { BorderedContainer } from './GenericComponents';

interface LocationProps {
  monster: IMonster,
}

export const LocationsComponent = ({monster}: LocationProps) => (
  <BorderedContainer>
    <h2>Locations</h2>
    {monster.locations.length === 0 && monster.taraLocations.length === 0 && monster.cobiLocations.length === 0 &&
      <p>Not found in any of the story key worlds</p>
    }
    {monster.locations.length > 0 && <p>Both versions: {monster.locations.join(', ')}</p>}
    {monster.taraLocations.length > 0 && <p>Tara Only: {monster.taraLocations.join(', ')}</p>}
    {monster.cobiLocations.length > 0 && <p>Cobi Only: {monster.cobiLocations.join(', ')}</p>}
  </BorderedContainer>
)