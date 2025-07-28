import './App.css';
import { Route,Routes } from 'react-router-dom';
import { Home ,Payment,SearchResults,SingleHotel, Wishlist,OrderSummary} from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/hotels/:name/:address/:id' element={<SingleHotel/>}></Route>
      <Route path='/hotels/:address' element={<SearchResults/>}/>
      <Route path='/wishlist' element={<Wishlist></Wishlist>}></Route>
      <Route path='/confirm-booking/stay/:id' element={<Payment></Payment>}></Route>
        <Route path="/order-summary" element={<OrderSummary />} />
    </Routes>
    
  );
}

export default App;
