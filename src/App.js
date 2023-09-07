import { useState, useEffect } from 'react';
import { extractLocations, getEvents } from './api';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);

    // Check if currentNOE is defined and is a number
    if (typeof currentNOE === 'number' && !isNaN(currentNOE)) {
      setEvents(filteredEvents.slice(0, currentNOE));
    } else {
      // Handle the case when currentNOE is not a valid number
      console.error('currentNOE is not a valid number:', currentNOE);
    }

    setAllLocations(extractLocations(allEvents));

    // const fetchData = async () => {
    //   const allEvents = await getEvents();
    //   const filteredEvents =
    //     currentCity === 'See all cities'
    //       ? allEvents
    //       : allEvents.filter((event) => event.location === currentCity);
    //   setEvents(filteredEvents.slice(0, currentNOE));
    //   setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className='App'>
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <EventList events={events} />
    </div>
  );
};

export default App;
