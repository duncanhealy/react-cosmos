fresh.mixins.DataManagerMixin = {
  loadCommentsFromServer: function() {
    var url = this.props.data;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  getDefaultProps: function() {
    return {
      // Enable polling by setting a value bigger than zero, in ms
      pollInterval: 0
    };
  },
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    this.loadCommentsFromServer();
    if (this.props.pollInterval) {
      this.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
  }
};
