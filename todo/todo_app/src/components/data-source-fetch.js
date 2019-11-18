import React from 'react';
const withDataSourceFetch = (children, fetchData) => {
  return class DataSourceFetch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFetching: true,
        data: []
      }
    }
  
    async componentDidMount() {
      this._fetchData();
    }
  
    async _fetchData () {
      try {
        this.setState({...this.state, isFetching: true});
        let data = await fetchData();
        this.setState({...this.state, isFetching: false, data: data});
      } catch(e) {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      }
    }
  
    render() {
      return children(this.state);
    }
  
  
  };
};

export default withDataSourceFetch;