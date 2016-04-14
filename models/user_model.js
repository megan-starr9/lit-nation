module.exports = function(app){

  /** Retrieve User from database
    **/
  this.get_user = function(name) {
    if(name == 'serien') {
      return {
        id : 1,
        username : 'serien',
        password : 'testpass',
        email : 'test@test.com',
        role : 4
      }
    }
  };

  this.create_user = function(form) {
    var new_user = {
      username : form.get_value('username'),
      password : form.get_value('password'),
      email : form.get_value('email'),
      role : 1
    }
  }

return this;

}
