var schedule = require("node-schedule");
var express = require("express");
var morgan = require("morgan");
var request = require("request");
var bodyParser = require("body-parser");
var fs = require("fs");
var moment = require("moment");

var config = require("./config");
var states = require("./states");

//send message from bot to the group
function sendMessage(settings) {
    var options = {
             url: 'https://api.groupme.com/v3/bots/post',
             method: 'POST',
             json: {
                 bot_id: config.bot_id,
                 text: settings.message,
                 attachments: []
             }
         };

    if(settings.image_url) {
        options.json.attachments.push(
            {
                type: "image",
                url: settings.image_url
            }
        );
    }

    if(settings.mentions) {
        options.json.attachments.push(
            {
                type: "mentions",
                user_ids: settings.mentions
            }
        );
    }

     request(options, (error, res, body) => console.log(body));
}

//function for sending upcoming duties
function sendDuties(prologue) {
     sendMessage({
         message: prologue + Object.keys(duties).map((key) => key == 'week_num' ? null: key + ": " + duties[key]).join("\n")
     });
}

function toggleDutyReminders() {
    duties_enabled = !duties_enabled;
    if(duties_enabled) {
    sendMessage({message: "Weekly reminders for duties are now enabled. The reminder will be sent every Sunday at 5:00pm"});
    } else {
        sendMessage({message: "Weekly reminders for duties are now disabled."});
    }
}

function updateWeekNum(num) {
        if(num <= states.length && num >= 1) {
            duties.week_num = num - 1;
            updateDuties();
            sendMessage({message: "Week number updated"});
        } else {
            sendMessage({message: "Invalid usage: !update week num [1-" + states.length + "]"});
        }
}

function parseMessage(message) {
    if(message == "!duties") {
       var weekendDates = moment().day(6).format("M/D").toString() + " - " + moment().day(7).format("M/D").toString();
        sendDuties("Duties for next weekend (" + weekendDates + ") are:\n");
    } else if(message == "!toggle reminders") {
        toggleDutyReminders();
    } else if(message.startsWith("!update week num")) {
        updateWeekNum(message.split(" ").pop());
    } else if(message == "!schedule") {
        sendMessage({
            message: "Next weekend is week " + (duties.week_num + 1),
            image_url: config.schedule_image_url
        });
    }
}

var duties_enabled = true;

//sets the initial state of the duties object to whatever is within the initial_state.json file
var duties = require("./initial_state");

function incrementWeekCounter() {
    duties.week_num = (duties.week_num + 1) % states.length;
}

function updateDuties() {
        duties = states[duties.week_num];

    // Ensures that if the server is restarted for whatever reason,
    // the week number will persist
    fs.writeFile('initial_state.json', JSON.stringify(duties, null, 2), (err) => {
        if(err) {
            console.log(error);
        } else {
            console.log("Initial state updated");
        }
    });
}

// Set up reminders on regular intervals
 var job = schedule.scheduleJob({hour: 17, minute: 00, day: 0}, () => {
     if(duties_enabled) {
         var weekendDates = moment().day(6).format("M/D").toString() + " - " + moment().day(7).format("M/D").toString();
         sendDuties("FINAL REMINDER\nDuties for this weekend ("+ weekendDates + ") are:\n"); 
         incrementWeekCounter();
         updateDuties();
     }
 });

//Express server setup for responding to messages
var PORT = process.env.PORT || config.PORT;

var app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

app.post('/', (req, res) => {
    if(req.body.sender_type == 'user' && req.body.text.charAt(0) == '!') {
        parseMessage(req.body.text);
    }
});

app.get('/', (req, res) => res.json({status: "success"}));

app.listen(PORT, () => console.log("Listening on Port " + PORT));
