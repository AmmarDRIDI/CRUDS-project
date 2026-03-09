

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let create = document.getElementById('create');
let ByTitle = document.getElementById('ByTitle');
let ByCategory = document.getElementById('ByCategory');
let inputs = document.getElementsByClassName('inputs');
let msg = document.getElementById('msg');
let deleteAll=document.getElementById('deleteAll');
let btnByTitle= document.getElementById('ByTitle');
let btnByCategory= document.getElementById('ByTitle');


let data;

if (localStorage.ListPro != null) {
    data = JSON.parse(localStorage.ListPro);
} else {
    data = [];
}


window.onload = function () {
    title.focus();
    HideDelete();
    ReadPro();
}

function ReadPro() {

    let table ='';

    for (let i = 0; i < data.length; i++) {
        
        table+=`<tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button id='upd' onclick='UpdateData(${i})'>Update</button></td>
                        <td><button id='dlt' onclick='deleteData(${i})'>Delete</button></td>
                    </tr>
        `;
}
    document.getElementById('tbody').innerHTML=table;
    HideDelete();

}
function getTotal() {
    if (price.value != '') {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.backgroundColor = 'green';
    }
    else {
        total.style.backgroundColor = '#721010';
        total.innerHTML = ''
    }

}

function CreateItem() {
    // for (let i=0;i<6;i++){
    //     if(inputs[i].value==''){
    //         msg.classList.remove('hide');
    //     }
    // }
        let Product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value
    }

        for (let i = 0; i < parseInt(count.value); i++) {
    data.push(Product);
    localStorage.ListPro=JSON.stringify(data);
    }

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML='';
    total.style.backgroundColor='#721010';
    count.value = '';
    category.value = '';

    ReadPro();
    HideDelete();

}

function deleteData(i){
        data.splice(i,1);
        localStorage.ListPro=JSON.stringify(data);
        ReadPro();
        HideDelete();

}


function HideDelete(){
        if (data.length>0){
            deleteAll.classList.remove('hide')
          }else{
             deleteAll.classList.add('hide');
        }
}


function deleteAllData(){

    data.splice(0,data.length);
    localStorage.clear();
    ReadPro();
    HideDelete();   
}


function SearchByTitle() {
            let result = '';
        
            for (let i = 0; i < data.length; i++) {
                let titleLower = data[i].title.toLowerCase();
                let searchLower = search.value.toLowerCase();
        
                if (titleLower.includes(searchLower) ||searchLower.includes(titleLower)) {
                    result += `<tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button>Update</button></td>
                        <td><button onclick='deleteData(${i})'>Delete</button></td>
                    </tr>`;
                }
            }
            document.getElementById('tbody').innerHTML = result;
}
    
function SearchByCategory() {
    let result = '';

    for (let i = 0; i < data.length; i++) {
        let categoryLower = data[i].category.toLowerCase();
        let searchLower = search.value.toLowerCase();

        if (categoryLower.includes(searchLower) || searchLower.includes(categoryLower)) {
            result += `<tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button>Update</button></td>
                        <td><button onclick='deleteData(${i})'>Delete</button></td>
                    </tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = result;
}

function showDataSearch() {
    if (search.value == '') {
        ReadPro();
    }
}

function UpdateData(i){

    title.value=data[i].title;
    price.value=data[i].price;
    taxes.value=data[i].taxes; 
    ads.value=data[i].ads;
    discount.value=data[i].discount; 
    
    category.value=data[i].category;
    getTotal();
    create.innerHTML='Update';
    count.classList.add('hide');
    title.focus();
    scroll({
        top:0,
        behavior:"smooth"
    })

    
    if(create.innerHTML='Update'){
         create.onmouseover = function() {
                 create.style.letterSpacing = '2px';
                 create.style.backgroundColor = '#d9cf0bff';
             };
        create.onmouseout = function() {
                 create.style.letterSpacing = '0px';
                create.style.backgroundColor = '#2e0557';
        };
        create.onclick= function(){


             create.onmouseover = function() {
                 create.style.letterSpacing = '2px';
                 create.style.backgroundColor = '#0bb511';
               };
            create.onmouseout = function() {
                 create.style.letterSpacing = '0px';
                 create.style.backgroundColor = '#2e0557';
                 };
           
           
            data[i].title=title.value;
            data[i].price=price.value;
            data[i].taxes=taxes.value;
            data[i].ads=ads.value;
            data[i].discount=discount.value;
            data[i].category=category.value;
            data[i].total=total.innerHTML;
            create.innerHTML='Create';
            count.classList.remove('hide');
            title.value = '';
            price.value = '';
            taxes.value = '';
            ads.value = '';
            discount.value = '';
            total.innerHTML='';
            total.style.backgroundColor='#721010';
            count.value = '';
            category.value = '';
            localStorage.ListPro=JSON.stringify(data);
            ReadPro();
        }   
}
}


