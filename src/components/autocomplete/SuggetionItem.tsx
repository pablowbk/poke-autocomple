import React from 'react';
import classes from './Autocomplete.module.scss';

interface PokeItemProps {
  name: string;
  link: string;
  setState: any;
}

const PokeItem:React.FC<PokeItemProps> = ({name, link, setState}): JSX.Element => {
  const handleItemClick = () => {
    console.log(link)
    setState({
      value: name,
      pokeUrl: link
    })
  }

  return (
    <p 
      className={classes.suggestion_item}
      onClick={handleItemClick}
    >
      {name}
    </p>
  )
};

export default PokeItem;