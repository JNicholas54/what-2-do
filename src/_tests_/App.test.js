/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  test('renders list of events', () => {
    const AppDOM = render(<App />).container;
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument(); // .toBeInTheDocument is called a MATCHER function
  });

  test('render CitySearch', () => {
    const AppDOM = render(<App />).container;
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });
});
