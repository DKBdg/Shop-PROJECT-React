import 'antd/dist/antd.css';
import '../../App.css';


import { Space,Button } from 'antd';
import { Link ,useNavigate} from 'react-router-dom';

export const Product= ({productObj})=>{
    let navigate = useNavigate();


    const handleClick =(productObj)=>{
        navigate(`../productinfo/${productObj.Details.CategoryID}?ProductID=${productObj.ProductID}`, { replace: true });
        
    }


    return (
        <Space className='ProductContainer' direction='vertical' onClick={()=>handleClick(productObj)}>


            <div className='ProductInfo'>{productObj.ProductName}</div>
            <div className='ProductInfo'>{productObj.Details.Color}</div>
            <div className='ProductInfo'>{productObj.Company}</div>
            <div className='ProductInfo'>{productObj.Price}</div>
            
            <img className='ProductInfo' src={productObj.Details.PhotoURL} style={{width:"100px",height:"100px"}}/>

            
        </Space>
    


    );


}