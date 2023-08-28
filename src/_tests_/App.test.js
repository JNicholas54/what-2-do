import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  test('renders list of events', () => {
    const AppDOM = render(<App />).container;
    expect(AppDOM.queryselector('#event-list')).toBeInTheDocument();
  });
});
