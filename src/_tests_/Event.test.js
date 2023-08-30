/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import { render } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

const mockEvent = mockData[0];

describe('<Event /> Component', () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event event={mockEvent} />);
  });

  test('has the events title', () => {
    const title = EventComponent.queryByText(mockEvent.summary);
    expect(title).toBeInTheDocument();
  });

  test('has the events time', () => {
    const time = EventComponent.queryByText(mockEvent.created);
    expect(time).toBeInTheDocument();
  });

  test('has the events location', () => {
    const location = EventComponent.queryByText(mockEvent.location);
    expect(location).toBeInTheDocument();
  });

  test('has the button "show details"', () => {
    const button = EventComponent.queryByText('Show Details');
    expect(button).toBeInTheDocument();
  });
});
