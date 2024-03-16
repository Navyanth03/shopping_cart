import { initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings={
    databaseURL: "https://realtime-database-cf213-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSettings);
const database=getDatabase(app);
const shoppingList=ref(database,"shoppingList")

const inputEl=document.getElementById("input-el");
const addEl=document.getElementById("add-el");
const shoppingListEl=document.getElementById("shopping-list");

addEl.addEventListener("click",function(){
    let inputValue=inputEl.value;
    if(inputValue){

        push(shoppingList,inputValue);
        clearInput();

    }
})

onValue(shoppingList,function(snapshot){
    if(snapshot.exists()){

        let items=Object.entries(snapshot.val());
        clearShoppingList();

        for(let i=0;i<items.length;i++){
            let currentItem=items[i];
            appendItems(currentItem);
        }

    }else{
        shoppingListEl.innerHTML="No items here...yet";
    }

})

function clearShoppingList(){
    shoppingListEl.innerHTML="";
}

function clearInput(){
    inputEl.value="";
}

function appendItems(item){
    let itemId=item[0];
    let itemValue=item[1];
    let newEl=document.createElement("li");

    newEl.addEventListener("click",function(){
        let location=ref(database,`shoppingList/${itemId}`);
        remove(location);
    })

    newEl.textContent=itemValue;
    shoppingListEl.append(newEl);
}