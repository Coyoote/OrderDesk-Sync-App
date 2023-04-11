# OrderDesk-Sync-App
This project allows you to keep track of new orders, their IDs and shipping addresses from Order Desk and updates the orders hourly

## Getting started
* First you need to create a test account here: https://app.orderdesk.me/account-setup
* Generate your Store ID and API key here: https://app.orderdesk.me/settings/api
* Add new custom orders to your store

### Dependencies
* Node v12.16.3 and higher
* NPM v6.14.4 and higher
* axios, dotenv, node-cron


### Installing
* Fork and clone this repository
* Run `npm install` in your terminal
* Create a .env file in root directory with following variables: STORE_ID="your store id" API_KEY="your api key"
* Run `npm start`
* The data will be displayed in the console
