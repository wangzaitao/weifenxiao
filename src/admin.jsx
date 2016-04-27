import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import AdminLayout from './components/AdminLayout.jsx';
import Home from './components/admin/Home.jsx';
import Login from './components/admin/Login.jsx';
import Type from './components/admin/product/Type.jsx';
import Category from './components/admin/product/Category.jsx';
import Brand from './components/admin/product/Brand.jsx';
import ParamGroup from './components/admin/product/ParamGroup.jsx';
import Product from './components/admin/product/Product.jsx';
import AddProduct from './components/admin/product/AddProduct.jsx';

ReactDOM.render(
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={AdminLayout}>
      <IndexRoute component={Home}/>
    </Route>

	  <Route path="/">
		  <Route path="login" component={Login}/>
	  </Route>
	  <Route path="product" component={AdminLayout}>
		  <IndexRoute component={Product}/>
		  <Route path="add_product" component={AddProduct}/>
		  <Route path="type" component={Type}/>
		  <Route path="category" component={Category}/>
		  <Route path="brand" component={Brand}/>
		  <Route path="param_group" component={ParamGroup}/>
	  </Route>
  </Router>,
  document.getElementById("body-wrapper")
);
