module.exports = {
  fields : [],
  values : [],
  errors : [],
  validations : [],
  failure : '',
  success : '',

  add_field : function(field) {
    this.fields.push(field);
  },

  /** User inputted values
    **/
  add_value : function(field, value) {
    this.values[field] = value;
  },
  get_value : function(field) {
    return this.values[field];
  },

  /** Field specific errors
    **/
  add_error : function(field, message) {
    this.errors[field] = message;
  },
  get_error : function(field) {
    return this.errors[field];
  },
  has_errors : function() {
    return Object.keys(this.errors).length > 0;
  },

  /** Form messages (entire)
    **/
  set_failure : function(message) {
    this.failure = message;
  },
  get_failure : function() {
    return this.failure;
  },
  set_success : function(message) {
    this.success = message;
  },
  get_success : function() {
    return this.success;
  },

  /** Field calculated validations (non model)
    **/
  add_validation : function(field, validation) {
    if(!this.validations[field]) {
      this.validations[field] = [];
    }
    this.validations[field].push(validation);
  },

  /** Run the calculated validations for entire form
      and figure errors
    **/
  validate : function() {
    var self = this;
    this.fields.forEach(function(field) {
      if(self.validations[field]) {
        // Check Required
        if (self.validations[field].indexOf('required') >= 0 && !self.values[field]) {
          self.add_error(field, 'This field is required!');
        }
        // Check Whitespace
        if (self.validations[field].indexOf('alphanumeric') >= 0 && !self.values[field].match(/^[0-9a-z._]+$/)) {
          self.add_error(field, 'This field can only contain alphanumeric characters or the following: ._');
        }
      }
    });
  },

  /** Clear out the form each page load
    **/
  reset : function() {
    this.fields = [];
    this.values = [];
    this.validations = [];
    this.errors = [];
    this.failure = '';
    this.success = '';
  },
}
