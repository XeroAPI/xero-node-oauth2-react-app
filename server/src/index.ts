require("dotenv").config();
const port = 3000;

import express from "express";
import { Request, Response } from 'express';
const session = require('express-session');

const path = require('path');

const cors = require('cors');

import {TokenSet, TokenSetParameters, XeroAccessToken, XeroClient, XeroIdToken} from 'xero-node';
import jwtDecode from 'jwt-decode';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URI;
const scopes = "offline_access openid profile email accounting.transactions accounting.budgets.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read files files.read assets assets.read projects projects.read payroll.employees payroll.payruns payroll.payslip payroll.timesheets payroll.settings";

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

class App {
  public app: express.Application;
  public consentUrl: Promise<String>;

  constructor() {
    this.app = express();
    // this.config();
    this.routes();
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin','*');
      res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
      res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
      next();
    });

    this.app.use(express.static(path.join(__dirname, '..' , 'dist')))

    this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  }

  authenticationData(req, res) {
    return {
      decodedIdToken: req.session.decodedIdToken,
      decodedAccessToken: req.session.decodedAccessToken,
      tokenSet: req.session.tokenSet,
      allTenants: req.session.allTenants,
      activeTenant: req.session.activeTenant,
    };
  };
  
  private routes(): void {
    const router = express.Router();

    this.app.use(session({
      secret: "something crazy",
      // store: new FileStore(fileStoreOptions),
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }));

    this.app.use("/", router);

    router.get('/', async (req : Request, res : Response) => {
      res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
      // res.send('Hello World!')
    })
    
    router.get('/api/connect', async (req: Request, res : Response) => {
      try {
        const consentUrl: string = await xero.buildConsentUrl();
        res.redirect(consentUrl);
    
      } catch (err) {
        res.send('Sorry, could not connect');
      }
    })
    
    router.get('/callback', async (req : Request, res : Response) => {
      try {
        const tokenSet: TokenSetParameters = await xero.apiCallback(req.url);
        await xero.updateTenants(false);
    
        console.log('xero.config.state: ', xero.config.state)
    
        const decodedIdToken: XeroIdToken = jwtDecode(tokenSet.id_token);
        req.session.tokenSet = tokenSet;
        if (tokenSet.id_token) {
          const decodedIdToken: XeroIdToken = jwtDecode(tokenSet.id_token);
          req.session.decodedIdToken = decodedIdToken;
        }
        const decodedAccessToken: XeroAccessToken = jwtDecode(tokenSet.access_token);
        req.session.decodedAccessToken = decodedAccessToken;
        req.session.tokenSet = tokenSet;
        req.session.allTenants = xero.tenants;
        req.session.activeTenant = xero.tenants[0];
        
        // res.send("authenticated");
        res.redirect("http://localhost:3000/")
        
      } catch (err) {
        console.log(err)
        res.status(res.statusCode);
      }
    })

    router.get('/api/organisations', async (req : Request, res : Response) => {
      try {
        const response = await xero.accountingApi.getOrganisations(req.session.activeTenant.tenantId);
        console.log(response.body || response.response.statusCode);

        res.send(JSON.stringify(response.body));
      } catch (err) {
        console.log(err);
        const error = JSON.stringify(err.response.body, null, 2);
        console.log(`Status Code: ${err.response.statusCode} => ${error}`);
      }
    })

    router.get('/api/accounts', async (req : Request, res : Response) => {
      try {
        const response = await xero.accountingApi.getAccounts(req.session.activeTenant.tenantId);
        console.log(response.response.statusCode);

        res.send(JSON.stringify(response.body));
      } catch (err) {
        console.log(err);
        const error = JSON.stringify(err.response.body, null, 2);
        console.log(`Status Code: ${err.response.statusCode} => ${error}`);
      }
    })

    router.get('/api/contacts', async (req : Request, res : Response) => {
      try {
        const response = await xero.accountingApi.getContacts(req.session.activeTenant.tenantId);
        console.log(response.response.statusCode);

        res.send(JSON.stringify(response.body));
      } catch (err) {
        const error = JSON.stringify(err.response.body, null, 2);
        console.log(`Status Code: ${err.response.statusCode} => ${error}`);
      }
    })
    
  }


  
  
 
}

export default new App().app;
