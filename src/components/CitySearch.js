import { useState } from 'react';

const CitySearch = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  return (
    <div id='city-search'>
      <input
        type='text'
        className='city'
        placeholder='Search for city'
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions ? <ul className='suggestions'></ul> : null}
    </div>
  );
};

export default CitySearch;
