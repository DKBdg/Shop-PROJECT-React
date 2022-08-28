
import 'antd/dist/antd.css';
import '../../App.css';


import { observer } from 'mobx-react-lite';
import ShopStore from '../Stores/ShopStore';
import {Product} from "../Objects/Product"
import { Space,Cascader } from 'antd';
import { useState } from 'react';
import CatalogInfo from "../Info/CatalogInfo.json";
import { FrequencyTable } from '../Objects/FrequencyTable';
const options = CatalogInfo.options;
  

    
export const Catalog=observer(()=>{
    const [CurrentRenderingProducts,AlterRenderingProducts]=useState(ShopStore.AllProducts);
    
    const onChange = (value) => {
        if(value===undefined){
            return;
          }
          AlterRenderingProducts(ShopStore.GetFilterProducts(value[0],value[1]));
          
          
      };

    return (


        <Space  className='MainPageWrapper' >
            <div className='Header'>Frequency of products supplying</div>
            <FrequencyTable/>

            <div className='Header'>How many products are there up to that time?</div>

            <div className='Count'>{ShopStore.AllProducts.length}</div>
            
            <div className='Header'>Choose Property</div>

            <Cascader options={options} onChange={onChange}placeholder="Please select" />

        <Space size="middle" wrap className='TopProductsWrapper'>
            {CurrentRenderingProducts.map((item) => 
               
                <Product productObj={item}/>
                
                
            )}

        </Space>



        </Space>


    );
});