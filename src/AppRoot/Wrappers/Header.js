import 'antd/dist/antd.css';
import '../../App.css';
import { Input, Space,Avatar,Button,Cascader} from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import ShopStore from '../Stores/ShopStore';
import { useNavigate } from "react-router-dom";
import HeaderInfo from "../Info/HeaderInfo.json";





export const Header=observer(()=>{
  let navigate = useNavigate();
  const options = HeaderInfo.options;

  const onChange = (value,navigatefunc) => {
    if(value===undefined){
      return;
    }
    navigatefunc(`../productinfo/${value[0]}?ProductID=${value[1]}`, { replace: true });
    console.log(value);
  };
  
  const filter = (inputValue, path) =>
  path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
  
  const handleClick=()=>{
    let UserStorage=JSON.parse(localStorage.getItem("UserStorage"));
    for(let i = 0 ; i < UserStorage.length;i++){
      if(UserStorage[i].Current){
        UserStorage[i].Current=false;

         localStorage.setItem("UserStorage",JSON.stringify(UserStorage));
         ShopStore.setCurrent(false);
         return;
      }
    }
    
    
  
  }



  return(
    <div className='HeaderWrapper'>

    <Space size={70} >
      <img alt="logo" src="https://www.adobe.com/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium" style={{height:"150px", width:"150px",margin:"20px"}}/>

      <Space direction='vertical' align='center'>
        <div>
          My Shop
        </div>

        <Space direction='horizontal'>
          <Link to="/" className='Link'>Main Page</Link>
          <Link to="/catalog" className='Link'>Catalog</Link>
          {ShopStore.GetisCurrent?<Link to="/cart" className='Link'>Cart</Link>:null }
          <Link to="/email" className='Link'>Write us a letter</Link>




        </Space>



      </Space>
    

      <Cascader
    options={options}
    onChange={e=>onChange(e,navigate)}
    placeholder="Please select"
    showSearch={{
      filter
    }}

  />


      <Space size="small">
      <Avatar size={48} icon={ShopStore.Icon} />
      {ShopStore.GetisCurrent? <div className='Link' onClick={handleClick}>Sign Out</div>:<Link to="/login" className='Link'>Sign In / Sign Up</Link>}
      </Space>
        


    </Space>

    </div>

  );





});