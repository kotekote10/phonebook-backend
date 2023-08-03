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
  name: "john doe",
  number: "22-32333-442-22",
});

person.save().then((result) => {
  console.log("person saved!");
  mongoose.connection.close();
});
