require("dotenv").config();
const port = 3000;

const express = require('express');
import { Request, Response } from 'express';
const session = require('express-session');

const cors = require('cors');

import {XeroClient} from 'xero-node';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URI;
const scopes = "offline_access openid profile email accounting.transactions accounting.budgets.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read files files.read assets assets.read projects projects.read payroll.employees payroll.payruns payroll.payslip payroll.timesheets payroll.settings";

const app = express(); 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next();
});

const xero = new XeroClient({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUris: [redirectUrl],
    scopes: scopes.split(" "),
    state: "imaParam=look-at-me-go",
    httpTimeout: 2000
  });
  
if (!client_id || !client_secret || !redirectUrl) {
  throw Error('Environment Variables not all set - please check your .env file in the project root or create one!')
}

const authenticationData: any = (req: Request, res: Response) => {
	return {
		decodedIdToken: req.session.decodedIdToken,
		decodedAccessToken: req.session.decodedAccessToken,
		tokenSet: req.session.tokenSet,
		allTenants: req.session.allTenants,
		activeTenant: req.session.activeTenant,
	};
};

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/connect', async (req: Request, res : Response) => {

  try {
    const consentUrl: string = await xero.buildConsentUrl();
    res.redirect(consentUrl);

  } catch (err) {
    res.send('Sorry, could not connect');
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})