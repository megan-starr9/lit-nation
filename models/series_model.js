module.exports = function(app){

  /** Retrieve User from database
  **/
  this.get_series = function(id) {
    if(id == 1) {
      return {
        id : 1,
        title : "Test Series",
        owner : 1,
        collaborators : [],
        stories : []
      }
    }
  };

  this.get_series_list = function(uid) {
    return [
      { id: 1, title : "Test Series", owner : 1},
      { id: 2, title : "Test Series 2", owner : 1}
    ]
  };

  return this;

}
