import axios from 'axios';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

// Get your Store id and API key from .env file
const { STORE_ID, API_KEY } = process.env;

// Set up a scheduled task to run every hour
// If you want to test the fetch request without waiting for 1 hour, add another * to the string and change 1 to * to execute the code every second
cron.schedule('* 1 * * *', async() => {
  try {
    const response = await axios.get('https://app.orderdesk.me/api/v2/orders', {
      headers: {
        'ORDERDESK-STORE-ID': STORE_ID,
        'ORDERDESK-API-KEY': API_KEY,
      },
      params: {
        'folder_name': 'New' // this param fetches the orders that are saved in 'New' folder in Order Desk
      }
      // the orders are sorted by date_added by default, they're sorted from newest to oldest
    });

    const { orders } = response.data;
    const orderInfo = orders.map(order => {
      return {
        id: order.id,
        shippingAddress: order.shipping,
      };
    });

    console.log(orderInfo);
  } catch (error) {
    console.log(error);
  }
});
