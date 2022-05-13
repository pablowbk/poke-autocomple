import React, { useCallback, useEffect, useReducer, useState } from "react";
import SuggestionItem from "./SuggetionItem";

import classes from './Autocomplete.module.scss';

type PokeItem = {
  name: string,
  url: string
}

type AutocompleteSate = {
  value?: string, 
  results?: PokeItem[],
  filtered?: PokeItem[],
  loading?: boolean,
  pokeUrl?: string
}

const Autocomplete: React.FC = (): JSX.Element => {
  // const [value, setValue] = useState<string>('');
  // const [results, setResults] = useState<PokeItem[]>([]);
  // const [filtered, setFiltered] = useState<PokeItem[]>([]);
  // const [pokeUrl, setPokeUrl] = useState<string>('');
  const [state, setState] = useReducer(
    (state: AutocompleteSate, newState: AutocompleteSate) => ({ ...state, ...newState }),
    { 
      value: '', 
      results: [],
      filtered: [],
      loading: false,
      pokeUrl: '' 
    }
  );

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1126')
      .then(res => res.json())
      .then(json => setState({results: json.results}))
    
    return () => setState({results: []});
  }, []);

  const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = ev.target.value;
    setState({value: targetValue});

    if (targetValue.length === 0 && targetValue === '') return setState({filtered: []});
    
    state.results && setState({
      filtered: state.results.filter((result: PokeItem) => result.name.includes(targetValue))
    })
  }, [state.results])

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    state.filtered?.find((item: PokeItem) => {
      console.log(item)
      if (item.name === state.value?.toLowerCase()) {
        setState({pokeUrl: item.url})
      } else {
        setState({pokeUrl:''})
      }
    })

    if (!state.value || !state.pokeUrl) return;
    console.log('fetching...')

    fetch(state.pokeUrl)
    .then(res => res.json)
    .then(json => console.log(json))

  }

  useEffect(() => {
    if (!state.pokeUrl) return;

    console.log('should fetch this one: ', state.pokeUrl)

    setState({filtered: []})

  }, [state.pokeUrl])

  return (
    <form 
      className={classes.wrapper}
      onSubmit={handleSubmit}
    >
      <input 
        type="text"
        placeholder="start typing..."
        value={state.value}
        onChange={handleChange}
        className={classes.searchInput}
      />

      { state.filtered && state.filtered.length > 0 && (
        <div className={classes.suggestions_box}>
          {state.filtered.map(
            (item: PokeItem) => (
              <SuggestionItem 
                key={item.url} 
                name={item.name}
                link={item.url}
                setState={setState}
              />
            )
          )}
        </div>
      )}
    </form>
  )
};

export default Autocomplete;