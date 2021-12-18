import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../Input';
import useDebounce from '../../hooks/useDebounce';
import { loadTournaments } from '../../actions/tournaments';

const SearchInput = () => {
  const dispatch = useCallback(useDispatch(), []);
  const [value, setValue] = useState(null);
  const debouncedValue = useDebounce(value);

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue !== null) {
      dispatch(loadTournaments(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  return <Input placeholder={'Search tournament ...'} onChange={handleOnChange} />;
};

export default SearchInput;
