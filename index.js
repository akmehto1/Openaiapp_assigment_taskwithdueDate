const express = require("express");
const app = express();
const port = 8000;
const db = require("./db/dbConfig");
app.use(express.json());
require('dotenv').config();
const cron = require('node-cron');
const taskModel = require('./Models/taskModel');
const userModel = require('./Models/userModel');
const twilio = require('twilio');


const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid)
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


//*****************************************Routes import********************************************************************** */

const loginRoute = require("./Routes/loginRoute");
const signUpRoute = require("./Routes/signupRoute");
const createRoute=require("./Routes/createRoute");
const getTaskRoute=require("./Routes/getTaskRoute");
const updateRoute=require("./Routes/updateRoute");
const deleteRoute=require("./Routes/delete")







//*****************************************End points********************************************************************** */
app.get("/", (req, res) => res.send("Hello World!"));





app.use("/login",loginRoute);
app.use("/signup", signUpRoute);
app.use('/create',createRoute);
app.use('/get', getTaskRoute);
app.use('/update',updateRoute)
app.use('/delete',deleteRoute);









// i Schedule the cron job to run every day at midnight (0:00)
cron.schedule('0 0 * * *', async () => {
  try {
    // Get all tasks
    const tasks = await taskModel.find();

    // Update priorities based on due dates
    tasks.forEach(async (task) => {
      const currentDate = new Date();
      const differenceInDays = Math.ceil((task.due_date - currentDate) / (1000 * 60 * 60 * 24));

      if (differenceInDays === 0) {
        task.priority = 0; // Due date is today
      } else if (differenceInDays >= 1 && differenceInDays <= 2) {
        task.priority = 1; // Due date is between tomorrow and day after tomorrow
      } else if (differenceInDays >= 3 && differenceInDays <= 4) {
        task.priority = 2; // Due date is 3-4 days away
      } else {
        task.priority = 3; // Due date is 5+ days away
      }

      // Save the updated task
      await task.save();
    });

    console.log('Priority update cron job completed');
  } catch (error) {
    console.error('Error updating priorities:', error);
  }
});







cron.schedule('0 * * * *', async () => {
  try {
    // Fetch tasks that have passed their due dates and are not done
    const tasks = await Task.find({
      due_date: { $lt: new Date() },
      status: { $ne: 'DONE' }
    }).populate('user_id');

    // Loop through tasks and make voice calls based on user priority
    for (const task of tasks) {
      const user = await User.findById(task.user_id);
      const phoneNumber = user.phone_number;
      
      


      client.calls
        .create({
          twiml: '<Response><Say>Your task with title ' + task.title + ' is overdue. Please complete it as soon as possible.</Say></Response>',
          to: phoneNumber,
          from: 'YOUR_TWILIO_PHONE_NUMBER'
        })
        .then(call => console.log('Call initiated: ' + call.sid))
        .catch(error => console.error('Error making call:', error));
    }

    console.log('Voice calling cron job completed');
  } catch (error) {
    console.error('Error making voice calls:', error);
  }
});






















app.listen(port, () => console.log(`Example app listening on port ${port}!`));
