// An object representing the duties for a given week in the cycle.
// The index represents the week number, the object is the duties for
// that given week. This will cycle repeatedly, i.e. the week after week 3
// is week 0 in this example. Note that the key and value will be used
// in the output message, so be sure to format in the way you want them
// to be displayed in the message.
//
// Format for a state:
// -Each state MUST contain a property called week_num which
// specifies its order in the cycle
//
// -The key should be the name of the cleaning duty, the value
// should be the name of the person doing the duty. You may have
// as many as you wish.
//
// initial_state.json:
// This file is used to persist which state to restart on if
// the server goes down for whatever reason. The JSON object
// in this file should exactly one of the states here for best
// results.

var states = [
    {
      "week_num": 0,
      "Bathroom": "PERSON 1",
      "Kitchen": "PERSON 2",
      "Living Room": "PERSON 3",
      "Trash, Rags, and Bathroom Mats": "PERSON 4"
    },
    {
      "week_num": 1,
      "Bathroom": "PERSON 4",
      "Kitchen": "PERSON 3",
      "Living Room": "PERSON 2",
      "Trash, Rags, and Bathroom Mats": "PERSON 1"
    },
    {
        "week_num": 2,
        "Bathroom": "PERSON 2",
        "Kitchen": "PERSON 4",
        "Living Room": "PERSON 1",
        "Trash, Rags, and Bathroom Mats": "PERSON 3"
    },
    {
        "week_num": 3,
        "Bathroom": "PERSON 3",
        "Kitchen": "PERSON 1",
        "Living Room": "PERSON 4",
        "Trash, Rags, and Bathroom Mats": "PERSON 2"
    }
];

module.exports = states;
