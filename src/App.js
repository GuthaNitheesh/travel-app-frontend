import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Payment, SearchResults, SingleHotel, Wishlist, OrderSummary } from './pages';
import { useAuth } from './context';
import { AuthModal } from './components';

function App() {
  const { isAuthModalOpen } = useAuth(); // ✅ import state

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels/:name/:address/:id' element={<SingleHotel />} />
        <Route path='/hotels/:address' element={<SearchResults />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/confirm-booking/stay/:id' element={<Payment />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>

      {/* ✅ Global AuthModal */}
      {isAuthModalOpen && <AuthModal />}
    </>
  );
}

export default App;
