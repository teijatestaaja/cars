import './App.css';
import Carlist from './components/Carlist';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </div>
  );
}

export default App;