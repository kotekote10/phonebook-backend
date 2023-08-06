const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phonebook:${password}@phonebook.z4clt1r.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

process.argv[3] &&
  person.save().then((result) => {
    console.log("added new entry");
    mongoose.connection.close();
  });

process.argv[3] === undefined &&
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name}  ${person.number}`);
    });
    mongoose.connection.close();
  });
