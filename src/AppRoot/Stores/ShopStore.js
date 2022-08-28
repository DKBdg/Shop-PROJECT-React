import ProductsInfo from "../Info/ProductsInfo.json" ;
import { makeAutoObservable } from "mobx";




class ShopStore{
    
    TopProducts=new Array();
    AllProducts= new Array();
    Categories = new Array();


    isCurrent= new Boolean();
    Icon="?";
    StepsCurrent=0;

    constructor(){
        makeAutoObservable(this);
        
        
        this.AllProducts=this.CombineCategories(ProductsInfo.Categories);
        this.TopProducts=this.ShuffleArray(this.CombineCategories(ProductsInfo.Categories));
        this.isCurrent=this.IsAnyCurrent();
        
        this.Icon=this.GetisCurrent?this.GetCurrentUser().Login[0]:"?";
        
        this.Categories= ProductsInfo.Categories;


        if(this.isCurrent){
            this.StepsCurrent=1;
        }

        
        
        
        
        
        
    }
    GetTotal=(User)=>{
        let sum=0;
        for(let i = 0 ; i<User.Cart.length;i++){
            sum+=+User.Cart[i].Price;
        }
        return sum;
    }
    DeleteCartProductByKey(key){
        let UserStorage= JSON.parse(localStorage.getItem("UserStorage"));
        
        for(let i = 0 ; i < UserStorage.length;i++){
            if(UserStorage[i].Current){
                UserStorage[i].Cart.splice(key,1);
            }
        }


        localStorage.setItem("UserStorage",JSON.stringify(UserStorage));

        return;
    }
    
    GetCurrentUser=()=>{
        let UserStorage=JSON.parse(localStorage.getItem("UserStorage"));
        
        for(let i = 0 ; i < UserStorage.length;i++){
            if(UserStorage[i].Current){
                return UserStorage[i];
            }
        }
        return;
        
    }
    get GetisCurrent(){
        return this.isCurrent;
    }
    setCurrent(prop){
        if(prop===false){
            this.Icon="?";
        }
        else{
            this.Icon=this.GetCurrentUser().Login[0];
        }
        this.isCurrent=prop;
    }
    

    IsAnyCurrent=()=>{
        let UserStorage=JSON.parse(localStorage.getItem("UserStorage"));
        if(UserStorage===null){
            return false;
        }

        for(let i = 0 ; i < UserStorage.length;i++){
          if(UserStorage[i].Current){
            return true;
          }
        }
        return false;
    
    }


    GetElementByID =(id)=>{

        for(let i = 0 ; i < this.AllProducts.length;i++){
            if(this.AllProducts[i].ProductID === +id){
                return this.AllProducts[i];
            }
        }


    }

    GetCategoryByID = (id)=>{

        for(let i = 0 ; i < ProductsInfo.Categories.length;i++){
            if(ProductsInfo.Categories[i].CategoryID===+id){
                return ProductsInfo.Categories[i];
            }
        }

    }



    FilterByPrice  = (array,price)=>{
        let res=[];
        for(let i = 0 ; i < array.length;i++){
            if(array[i].Price<=+price){
                res.push(array[i]);
            }
        }
        return res;




    }

    FilterByCompany  = (array,company)=>{
        let res=[];
        for(let i = 0 ; i < array.length;i++){
            if(array[i].Company===company){
                res.push(array[i]);
            }
        }
        return res;




    }


    FilterByColor  = (array,color)=>{
        let res=[];
        for(let i = 0 ; i < array.length;i++){
            if(array[i].Details.Color===color){
                res.push(array[i]);
            }
        }
        return res;




    }

    FilterByCategory = (array,category)=>{

        let res=[];
        for(let i = 0 ; i < array.length;i++){
            if(array[i].CategoryName===category){
                res = array[i].Products;
                return res;
            }
        }
        return null;
    }


    
    
    
    ShuffleArray = (array)=>{



        
        for(let i= 0;i<array.length;i++){
            let rndi= Math.floor(Math.random()*(array.length-1));
            
            let el=array[i];
            
            array[i]=array[rndi];
            
            array[rndi]=el;
    
            
        }
        return array;
    }
    
    
    CombineCategories = (array)=>{
        let result=[];
        
        for(let i=0;i<array.length;i++){
            
            for(let j = 0; j<array[i].Products.length;j++){
                result.push(array[i].Products[j]);
            }
            
            
        }
        
        return result;
        
        
    }
    
    get GetTopProducts(){


        return this.TopProducts;
    }


    GetFilterProducts(property,value){
        let array=[];
        if(/^category$/i.test(property)){
            array=this.FilterByCategory(ProductsInfo.Categories,value); 
        }
        else if(/^color$/i.test(property)){
            array=this.FilterByColor(this.AllProducts,value); 
         }
         else if(/^company$/i.test(property)){
            array=this.FilterByCompany(this.AllProducts,value); 
         } 
         else if(/^price$/i.test(property)){
            array=this.FilterByPrice(this.AllProducts,value); 
         } 
        else{
            console.log("error");
            throw 5;
        }
        return array;

    }
    
    
    
    
}

export default new ShopStore();
