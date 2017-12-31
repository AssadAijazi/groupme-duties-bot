# groupme-duties-bot
A GroupMe bot for setting up reminders for cleaning duties/chores. Perfect for families and roommates!

## Prerequisites
- Must have a GroupMe account.
- Must have some some sort of cloud hosting environment (Amazon EC2, heroku, Google Computing Engine, etc...) to run the application, or port forwarding or ngrok if you want to run it locally. Essentially, you need a public URL so that the bot can access the server application from anywhere.
- Must have node.js installed on said environment.

## Using This Bot
1) Use `git clone https://github.com/AssadAijazi/groupme-duties-bot.git` to create a copy of the repository.
2) Go to https://dev.groupme.com/bots and sign in with your GroupMe account.
3) Click 'Create Bot' and put in the desired settings. The callback URL should be the URL where the application will be deployed.
4) Copy the Bot Id and placing it into the correct space in the `config.js` file. Also be sure to specify the port number on which the application will be deployed.
5) If desired, specify an image URL of the cleaning schedule. Note this will only work for URLs obtained via the GroupMe imaging service. See https://dev.groupme.com/docs/image_service for details.
6) Complete the `states.js` file. Each state represents the responsibilities for a particular week in the cycle. See comments for more detailed instructions. Be sure to also complete the `initial_state.json` file.
7) On your deployment environment, copy over the project with all of the changes you made and run `npm install && npm start` to start the server on the port specified in the `config.js` file.
NOTE: If using ngrok, now would be the time to run `ngrok http [YOUR PORT NUM]` and use the public URL as the callback URL for the bot on GroupMe.
8) Your bot should now be running! Try it out by sending !duties to the specified chat.

## Commands
The following commands are supported:
- !duties: Sends a message specified all of the cleaning duties for the upcoming weekend.
- !toggle reminders: Toggles whether to send weekly reminders about duties for the weekend. By default, a reminder will be sent every Sunday at 5pm. If you wish to change this, edit the node-schedule code in the index.js. See https://github.com/node-schedule/node-schedule for usage.
- !update week num [WEEK NUMBER]: Sets the current week to week [WEEK NUMBER] in the schedule. Week numbers start from 1 and cannot be greater than the number of states in the states.js file.
- !schedule: Sends a message telling what number week next week is in the cycle. If a schedule image URL is specified, it will also send out that image in the message.
