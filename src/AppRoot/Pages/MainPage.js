
import 'antd/dist/antd.css';
import '../../App.css';


import { observer } from 'mobx-react-lite';
import ShopStore from '../Stores/ShopStore';
import {Product} from "../Objects/Product"
import { Space,Steps} from 'antd';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const { Step } = Steps;

export const MainPage=observer(()=>{
    const [current, setCurrent] = useState(ShopStore.StepsCurrent);



    let navigate = useNavigate();
    
    const onChange = (value) => {
      console.log('onChange:', current);
      if(value==1){
        navigate(`../login`, { replace: true });

      }
      else if(value==2){
        navigate(`../catalog`, { replace: true });

      }
      else if(value==3){
        navigate(`../email`, { replace: true });

      }
      setCurrent(value);
      ShopStore.StepsCurrent=value;
    };

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
      
    const [CategoryProducts,AlterProducts]=useState(ShopStore.AllProducts);
    const handleCategory =(ID)=>{
        AlterProducts(ShopStore.GetCategoryByID(ID).Products);
    }
    return (


        <Space  className='MainPageWrapper' >
        <div className='Header'>What to do</div>


        <div className='Description'>
        <div></div>
        <Steps current={current} onChange={onChange} direction="vertical"  type="navigation">
        <Step title="Visit our site" description="We are gettin' more popular" />
        <Step title="Register or log in" description="Register on our website" />
        <Step title="Buy Yourself Something" description="Support us" />
        <Step title="Send us an email" description="Give your invaluable feedback" />
      </Steps>

        </div>




        <div className='Header'>Top Products</div>
        <Space size="middle" wrap className='TopProductsWrapper'>
            {ShopStore.GetTopProducts.map((item,key) => 
              {  if(key<6)
                {return <Product productObj={item}/>;}
                
                
            })}

        </Space>
        
        <Space size={180} className="Header">
            {ShopStore.Categories.map((e)=><div onClick={()=>{handleCategory(e.CategoryID)}}>
                {e.CategoryName}
            </div>)}


        </Space>
        

        <Space size="middle" wrap className='TopProductsWrapper'>
            {CategoryProducts.map((item) => 
              {  
                {return <Product productObj={item}/>;}
                
                
            })}

        </Space>

        </Space>


    );
});
