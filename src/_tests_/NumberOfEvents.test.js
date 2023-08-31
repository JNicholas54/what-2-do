/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import { render } from '@testing-library/react';

describe('<NumberOfEvents /> Component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  test('has the input textbox', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('default number of events is 32', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    expect(input).toHaveValue('32');
  });

  test('updates number of events when user types', async () => {
    const user = userEvent.setup();
    const input = NumberOfEventsComponent.queryByRole('textbox');
    await user.type(input, '{backspace}{backspace}10'); // im using backspace to simulate a user clearing the field and entering a new input which in this case is 10.
    expect(input).toHaveValue('10');
  });
});
