import './App.css';
import './components/movies';
import Movies from './components/movies';

import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas, far)

function App() {
  return (
    <div>
      <Movies />
    </div>
  );
}

export default App;
