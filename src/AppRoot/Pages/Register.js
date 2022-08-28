import 'antd/dist/antd.css';
import '../../App.css';

import { Input, Space,Button } from 'antd';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";


export const Register =()=>{
    const InputLoginBlock = useRef(null);
    const InputPassowrdBlock = useRef(null);
    let navigate = useNavigate();




    let error={
        pwrderr:false,
        lgnerr:false
    };
    
    let User = {
        Login: "Unknown",
        Password:"",
        Cart:[],
        Current:false
    }
    const handleLoginType=(e)=>{
        User.Login=e.target.value;
        if(!/\w{1,}@\w{1,}\.\w{1,}/i.test(User.Login)){
            InputLoginBlock.current.input.style.border="thin solid red";
            error.lgnerr=true;
        }
        else{
            InputLoginBlock.current.input.style.border="";
            error.lgnerr=false;
        }
    }
    const handlePasswordType=(e)=>{
        User.Password=e.target.value;

        if(!(/[a-z]/.test(User.Password) && /[A-Z]/.test(User.Password) && /\d/.test(User.Password) && /[$%#@!]/.test(User.Password)&&(/\S/.test(User.Password))&& /.{8,20}/.test(User.Password)))
        {
            InputPassowrdBlock.current.input.style.border="thin solid red";
            error.pwrderr=true;

        }
        else{
            InputPassowrdBlock.current.input.style.border="";
            error.pwrderr=false;
        }
         

    }

    const handleClick=()=>{
        let UserStorage=JSON.parse(localStorage.getItem("UserStorage"));
        if(UserStorage ===null){
            UserStorage=[]
        }


        for(let i = 0 ; i<UserStorage.length;i++){
            if(UserStorage[i].Login===User.Login){
                InputLoginBlock.current.input.style.border="thin solid red";

                return;
            }
        }


        if(!(error.lgnerr||error.pwrderr)){
            UserStorage.push(User);
            localStorage.setItem("UserStorage",JSON.stringify(UserStorage));
            
            
            

            console.log(JSON.parse(localStorage.getItem("UserStorage")));

            navigate(`../login`, { replace: true });

            return;
        }


    }


    
    return (

        


        <div className='SignWrapper'>
        <div className='Header'>Sign up</div>
        <Space direction="vertical" className='SpaceWrapper'>
        <Input placeholder="input" onChange={e=>handleLoginType(e)} ref={InputLoginBlock}/>
    

        <Input.Password placeholder="input password" onChange={e=>handlePasswordType(e)} ref={InputPassowrdBlock}/>

        <Button type="primary" onClick={handleClick}>Log up</Button>


        </Space>
        
        
        
        </div>
        
        








    );




}