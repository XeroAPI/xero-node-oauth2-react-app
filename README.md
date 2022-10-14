# Xero Node Oauth2 React App

This Node project demonstrates how to set up a React frontend when using the Xero-Node SDK and OAuth2.0. 

## Setup

### Configuring with Credentials
Create an API app in Xero to get `CLIENT_ID` and `CLIENT_SECRET`
- Create a free Xero user account (if you don't already have one)
- Login to [Xero Developer Portal](https://developer.xero.com/app/manage)
- Click "New App"
- Enter your app details (the redirect URI for this app is: `http://localhost:3000/callback`)
- Click "Create App"
- Create an `.env` file in the root of the `server` directory or rename and replace the values for the variables in the provided `sample.env` file. 

```
CLIENT_ID='...'
CLIENT_SECRET='...'
REDIRECT_URI='http://localhost:3000/callback'
```
### Build and Run
#### To get started
NOTE: THIS APP WILL INTERACT WITH THE CONNECTED ORG'S DATABASE. DO NOT CONNECT TO A PRODUCTION ACCOUNTING ORG. Set up a Demo Company for worry-free exploration of the app. 

Navigate to the ./server directory and run the following commands:
- `npm install`
- `npm run start`

#### More details (or if you make changes to the React App)
There are separate apps for the client and the server, but the build files from the client are copied into the server directory so they can be served as static files. 

If changes are made to the FE app, and you would like to rebuild to interact with the BE, run the following commands:
- Navigate to the ./client directory
- `npm install`
- `npm run build` (this will also copy the build files into the ./server directory)
- Navigate back to the ./server directory 
- Restart the server
