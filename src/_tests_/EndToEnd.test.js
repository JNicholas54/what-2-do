import puppeteer from 'puppeteer';

// FEATURE 2
describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    // if your event element has a different selector, use it instead of .event
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });
  // SCENARIO 1
  test('An event element is collapsed by default', async () => {
    // if your event's details have a different selector, use it instead of .event .details
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  //SCENARIO 2
  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  //SCENARIO 3
  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
