import React from 'react';

import Menu from './Menu.jsx'
import PlantList from './PlantList.jsx'



class App extends React.Component {

  render() {
    return (
        <div>
          <Menu />
          <PlantList />
        </div>
      );
  }
}

export default App;