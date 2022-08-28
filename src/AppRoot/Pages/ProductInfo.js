import 'antd/dist/antd.css';
import '../../App.css';
import { Link, useParams, useSearchParams,useNavigate } from "react-router-dom";
import { Space,Button ,Card} from 'antd';
import { observer } from 'mobx-react-lite';
import ShopStore from '../Stores/ShopStore';


export const ProductInfo =observer(()=>{
    let navigate = useNavigate();


    const params = useParams();
    let [searchParams, setSearchParams] = useSearchParams();

    let Product = ShopStore.GetElementByID(searchParams.get("ProductID"));
    let Category=ShopStore.GetCategoryByID(params.id);

    const handleClick =()=>{
        

        if(!ShopStore.GetisCurrent){
            navigate(`../login`, { replace: true });
            return;
        }
        
        
        let UserStorage=JSON.parse(localStorage.getItem("UserStorage"));
        for(let i = 0 ; i < UserStorage.length;i++){
            if(UserStorage[i].Current===true){
                UserStorage[i].Cart.push(Product);
            }
        }

        localStorage.setItem("UserStorage",JSON.stringify(UserStorage));
        
        console.log(JSON.parse(localStorage.getItem("UserStorage")));
        navigate(`../`, { replace: true });
        return;
    

    }

    return (<>
        <Space className='HorWrapper' size={200}>


            <img src= {Product.Details.PhotoURL} style={{width:"200px", height:"200px"}}/>

        <Card title="Product Info" bordered={false} style={{ width: 300 }} className='DescWrapper'>
            <div>{Category.CategoryName}</div>
            <div>{Product.ProductName}</div>
            <div>{Product.Price} {Product.Currency}</div>
            <div>{Product.Details.Country}</div>
            <div>{Product.Details.Color}</div>
            <div>{Product.Details.Description}</div>
            <div>{Product.Details.Company}</div>
            </Card>


            <Button type="primary" onClick={handleClick}>{ShopStore.GetisCurrent?"Buy":"Sign in to buy"}</Button> 





        </Space>



    </>);


});