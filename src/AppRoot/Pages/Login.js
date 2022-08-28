import 'antd/dist/antd.css';
import '../../App.css';

import { Input, Space,Button } from 'antd';
import { Link ,useNavigate} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';


import ShopStore from '../Stores/ShopStore';

export const Login =observer(()=>{
    let navigate = useNavigate();
    const InputLoginBlock = useRef(null);
    const InputPassowrdBlock = useRef(null);
    let User = {
        Login: "Unknown",
        Password:"",
        Cart:[],
        Current:true
    }


    const handleLoginType=(e)=>{
        User.Login=e.target.value;



    }
    const handlePasswordType=(e)=>{

        User.Password=e.target.value;





    }
    const handleClick=()=>{
        let UserStorage=JSON.parse(localStorage.getItem("UserStorage"));
        if(UserStorage===null){
            console.log("no user");
            return;
        }



        for(let i = 0 ; i < UserStorage.length;i++){
            if(UserStorage[i].Login===User.Login){
                if(UserStorage[i].Password===User.Password){
                    console.log("Authorized");
                    User.Cart = UserStorage[i].Cart;
                    UserStorage[i]=User;
                    localStorage.setItem("UserStorage",JSON.stringify(UserStorage));
                    ShopStore.setCurrent(true);
                    
                    navigate(`../`, { replace: true });

                    console.log(JSON.parse(localStorage.getItem("UserStorage")));
                    
                }
                else{
                   InputLoginBlock.current.input.style.border="";
                   InputPassowrdBlock.current.input.style.border="thin solid red";
                }

                return;
            }
        }

        InputLoginBlock.current.input.style.border="thin solid red";

    }
    return (
        <div className='SignWrapper'>
        <div className='Header'>Sign in</div>
        <Space direction="vertical" className='SpaceWrapper'>
        <Input placeholder="input" onChange={e=>handleLoginType(e)} ref={InputLoginBlock}/>
    

        <Input.Password placeholder="input password" onChange={e=>handlePasswordType(e)} ref={InputPassowrdBlock}/>

        <Button type="primary" onClick={handleClick}>Log in</Button>

        <Link to="/register">Haven't an account? Log up</Link>

        </Space>
        
        
        
        </div>







    );




});