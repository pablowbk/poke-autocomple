import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import pokeball from '../../pokeball.svg';

import classes from './PokeLoader.module.scss';

interface PokeLoaderProps {
  loading?: boolean;
}

const PokeLoader: React.FC<PokeLoaderProps> = ({loading}): JSX.Element => {

  useEffect(() => {
    gsap.from('.pokeContainer', {
      
    })
    gsap.to('.pokeBall', {
      rotate: 360,
      duration: 2
    })
  
  }, [loading])
  

  return (
    <div className={`${classes.PokeBall} pokeContainer`}>
      <img className={`pokeBall`} src={pokeball} alt="" />
    </div>
  )
};

export default PokeLoader;