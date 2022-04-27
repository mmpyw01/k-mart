import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import CardList from "./pages/CardList";
import Register1 from "./pages/Register1";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Post from "./pages/Post";
import TradeList from "./pages/TradeList";
import Card from "./pages/Card";
import User from "./pages/User";
import Profile from "./pages/Profile";
import OrderList from './pages/OrderList';
import Messenger from './pages/messenger/Messenger';
import { useSelector } from 'react-redux';
import Edit from './pages/Edit';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/products/:category">
        <ProductList />
      </Route>
      <Route path="/cards/:category">
        <CardList />
      </Route>
      <Route path="/product/:id">
        <Product />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/success">
        <Success />
      </Route>
      <Route path="/login">
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register1 />}
      </Route>
      <Route path="/trade">
        <TradeList />
      </Route>
      <Route path="/card">
        <Card />
      </Route>
      <Route path="/post">
        <Post />
      </Route>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/orderlist">
        <OrderList />
      </Route>
      <Route path="/edit/card/:id">
        <Edit />
      </Route>
      <Route path="/messenger">
          {user ? <Messenger/> : <Redirect to="/"/>}
      </Route>
      </Switch>
    </Router>
    
  );
};

export default App;