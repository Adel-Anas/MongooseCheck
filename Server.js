// app.js

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);

// Create and save a record
const newPerson = new Person({
  name: "John",
  age: 30,
  favoriteFoods: ["Pizza", "Burger"]
});

newPerson.save(function(err, data) {
  if (err) return console.error(err);
  console.log("Saved:", data);
});

// Create many records
const arrayOfPeople = [
  { name: "Alice", age: 25, favoriteFoods: ["Sushi"] },
  { name: "Bob", age: 35, favoriteFoods: ["Pasta"] },
];

Person.create(arrayOfPeople, function(err, people) {
  if (err) return console.error(err);
  console.log("Created:", people);
});

// Find people by name
Person.find({ name: "John" }, function(err, people) {
  if (err) return console.error(err);
  console.log("Found:", people);
});

// Find one person with a specific favorite food
Person.findOne({ favoriteFoods: "Burger" }, function(err, person) {
  if (err) return console.error(err);
  console.log("Found:", person);
});

// Find a person by their _id
const personId = "<person's _id>";

Person.findById(personId, function(err, person) {
  if (err) return console.error(err);
  console.log("Found:", person);
});

// Perform classic updates
const personIdToUpdate = "<person's _id>";

Person.findById(personIdToUpdate, function(err, person) {
  if (err) return console.error(err);

  person.favoriteFoods.push("Hamburger");
  person.save(function(err, updatedPerson) {
    if (err) return console.error(err);
    console.log("Updated:", updatedPerson);
  });
});

// Perform new updates
const personNameToUpdate = "John";

Person.findOneAndUpdate(
  { name: personNameToUpdate },
  { age: 20 },
  { new: true },
  function(err, updatedPerson) {
    if (err) return console.error(err);
    console.log("Updated:", updatedPerson);
  }
);

// Delete one person by their _id
const personIdToDelete = "<person's _id>";

Person.findByIdAndRemove(personIdToDelete, function(err, removedPerson) {
  if (err) return console.error(err);
  console.log("Removed:", removedPerson);
});

// Delete all people with the name "Mary"
const nameToDelete = "Mary";

Person.remove({ name: nameToDelete }, function(err, result) {
  if (err) return console.error(err);
  console.log("Removed:", result);
});

// Chain search query helpers
Person.find({ favoriteFoods: "Burritos" })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec(function(err, data) {
    if (err) return console.error(err);
    console.log("Query Result:", data);
  });
