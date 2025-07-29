import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Payment, SearchResults, SingleHotel, Wishlist, OrderSummary } from './pages';
import { Layout } from './components/Layout'; // ✅ Import Layout

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hotels/:name/:address/:id" element={<SingleHotel />} />
        <Route path="hotels/:address" element={<SearchResults />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="confirm-booking/stay/:id" element={<Payment />} />
        <Route path="order-summary" element={<OrderSummary />} />
      </Route>
    </Routes>
  );
}

export default App;
