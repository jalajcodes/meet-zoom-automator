<div align="center">
<img src="public/logo.png" alt="logo">

# ZooMeet

Zoom and Google Meet Automater, never miss a meeting again.

_ZooMeet is a WebApp which automates Zoom and Meet meeting for you. Just log in with your account and choose for which events you want to start alarm. Thats it, as long as you have that browser tap opened, we'll ring the alarm and open the meeting automatically for you._

![Forks](https://img.shields.io/github/forks/jalajcodes/zoomeet)
![Stars](https://img.shields.io/github/stars/jalajcodes/zoomeet)

</div>

---

## Features

- Get all the upcoming events
- Set alarm for the events you want to attend
- Ring alarm 20 seconds before the meeting start time.
- Open the meeting automatically
- Create new events from the app itself.
- Refresh Events
- Start All Alarms at once
- Change Alarm Tune (coming soon)
- Browser Extension (Coming Soon)
- Sort, Filter and Search Events (In Progress)
- Update Events (In Progress)
- Delete Events (In Progress)

## Setup Locally

- Clone the repo
- Go to `console.developer.google.com` and create a new project.
- Go to Api and Services page and enable Google Calendar API.
- Create a new file in root of your project and name it `apiGoogleconfig.json`.
- Copy the following code and paste it in the file after adding the client id and api key you got from google developer console.

```
{
    "clientId": "CLIENT_ID",
    "apiKey": "API_KEY",
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
}
```

- Run the following command in the cloned repo:

```
npm install
npm start
```

- Happy Hacking!
