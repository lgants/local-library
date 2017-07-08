const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const AuthorSchema = Schema(
  {
    first_name: {
      type: String,
      required: true,
      max: 100
    },
    family_name: {
      type: String,
      required: true,
      max: 100
    },
    date_of_birth: {
      type: Date
    },
    date_of_death: {
      type: Date
    },
  }
);

// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name;
  });

// Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id;
  });

AuthorSchema
  .virtual('lifespan_formatted')
  .get(function () {
    let date_of_birth = moment(this.date_of_birth).format('MMMM Do, YYYY')
    let date_of_death = moment(this.date_of_death).format('MMMM Do, YYYY')
    return `${date_of_birth} - ${date_of_death}`;
  });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
