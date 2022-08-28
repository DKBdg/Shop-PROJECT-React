
import 'antd/dist/antd.css';
import '../../App.css';


import { Link ,useNavigate} from 'react-router-dom';
import { Space,Button } from 'antd';
import { ProductTable } from '../Objects/ProductTable';
import ShopStore from '../Stores/ShopStore';
import { useState } from 'react';


export const Cart = ()=>{

    let navigate = useNavigate();


    const handleClick=()=>{



        let UserStorage= JSON.parse(localStorage.getItem("UserStorage"));

        for(let i = 0 ; i < UserStorage.length;i++){
            if(UserStorage[i].Current){
                UserStorage[i].Cart=[];
            }
        }
        localStorage.setItem("UserStorage",JSON.stringify(UserStorage));


        navigate(`../`, { replace: true });



    }
    let UserCurrent=ShopStore.GetCurrentUser();
    const [total,altertotal]=useState( ShopStore.GetTotal(UserCurrent))

    return(

        <div className='MainPageWrapper'>
            <Space size="large">

            <ProductTable Current={UserCurrent} TotalChange={altertotal}/>
            <Button onClick={handleClick} >Buy</Button>
            </Space>
            <div className='Header'>How much should you pay?</div>

            <div className='Count'>{total} USD</div>
            

        
        </div>
    );



}