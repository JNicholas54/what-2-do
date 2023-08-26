'use strict';

const { google } = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly',
];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://JNicholas54.github.io/what-2-do/'];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array is passed to the `scope` option.
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
  );
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(token),
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(err),
      };
    });
};

// module.exports.getCalendarEvents = async (event) => {
//   const oAuth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     redirect_uris[0]
//   );
//   const access_token = decodeURIComponent(
//     `${event.pathParameters.access_token}`
//   );
//   oAuth2Client.setCredentials({ access_token });

//   return new Promise((resolve, reject) => {
//     calendar.events.list(
//       {
//         calendarId: CALENDAR_ID,
//         auth: oAuth2Client,
//         timeMin: new Date().toISOString(),
//         singleEvents: true,
//         orderBy: "startTime",
//       },
//       (error, response) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(response);
//         }
//       }
//     );
//   })
//     .then((results) => {
//       return {
//         statusCode: 200,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Credentials": true,
//         },
//         body: JSON.stringify({ events: results.data.items }),
//       };
//     })
//     .catch((err) => {
//       console.error(err);
//       return {
//         statusCode: 500,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Credentials": true,
//         },
//         body: JSON.stringify(err),
//       };
//     });
// };
