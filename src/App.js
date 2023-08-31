import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  // const [allLocations, setAllLocations] = useState([]);
  // const [currentCity, setCurrentCity] = useState();

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE)); //this takes the first 32 events
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='App'>
      <NumberOfEvents />
      <CitySearch />
      <EventList events={events} />
    </div>
  );
};

export default App;
