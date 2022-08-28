
import { Layout } from './AppRoot/Layout';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from './AppRoot/Pages/MainPage';
import { Catalog } from './AppRoot/Pages/Catalog';
import { Register } from './AppRoot/Pages/Register';
import { Login } from './AppRoot/Pages/Login';
import {ProductInfo} from "./AppRoot/Pages/ProductInfo"
import { Cart } from './AppRoot/Pages/Cart';
import { observer } from 'mobx-react-lite';
import ShopStore from './AppRoot/Stores/ShopStore';
import { Email } from './AppRoot/Pages/Email';

const App=observer(()=> {




  return (
    <div className='rootwrap'>

      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage/>} />
          <Route path="/catalog" element={<Catalog/>}/>
          <Route path="/cart" element={ShopStore.GetisCurrent?<Cart/>:null}/>
          <Route path="/email" element={<Email/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/productinfo/:id" element={<ProductInfo/>}/>









        </Route>
        <Route path="*" element={<>404</>} />





      </Routes>
     
     
     
     

   


    </div>
  );
});

export default App;
