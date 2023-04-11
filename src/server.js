import axios from 'axios';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

// Get your Store id and API key from .env file
const { STORE_ID, API_KEY } = process.env;


// Set up a scheduled task to run every hour
// If you want to test the fetch request without waiting for 1 hour, add another * to the string and change 1 to * to execute the code every second
cron.schedule('* * * * * *', async() => {
  try {
    const milisecondHour = 60 * 60 * 1000;
    const oneHourAgo = new Date(Date.now() - milisecondHour);
    const response = await axios.get('https://app.orderdesk.me/api/v2/orders', {
      headers: {
        'ORDERDESK-STORE-ID': STORE_ID,
        'ORDERDESK-API-KEY': API_KEY,
      },
      params: {
        // this param allows to filter the orders that were added in the last hour
        'search_start_date_local': oneHourAgo,
      }
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
