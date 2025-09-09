const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => {
            displayCategories(data.categories)
        })
}
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('card-container').classList.add('hidden')
    }
    else {
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('card-container').classList.remove('hidden')
    }
}
const removeActive = () => {
    const category = document.querySelectorAll('.category');
    category.forEach(btn => btn.classList.remove('active'))
}
const loadAllCards = () => {
    manageSpinner(true);
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayCards(data.plants))
}
const loadCategoryCard = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`card-category-${id}`)
            clickBtn.classList.add('active')
            displayCategoryCard(data.plants)
        })
}
const loadCardDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    const details = await res.json();
    displayDetail(details)
}
let total = 0;
const addToCart = (name, price, id) => {
    const cartContainer = document.getElementById('cart-container');
    const singleCart = document.createElement('div');
    singleCart.innerHTML = `<div id="single-cart-${id}" class=" cart flex items-center justify-between bg-[#F0FDF4] rounded-lg p-1">
                            <div class="space-y-2">
                                <p class="text-sm font-semibold">${name}</p>
                                <p class="text-gray-500">$${price} x 1</p>
                            </div>
                            <i id="cart-cross-icon-${id}"  class="cross-btn-${id} fa-solid fa-xmark text-gray-500"></i>
                        </div>`
    cartContainer.append(singleCart)
    // 1.get the container
    const showTotal = document.getElementById('total-price')
    //2.get the price already exist
    // 3.add the price
    total = total + price;
    // 4.price to container inner text
    showTotal.innerText = total;
    // 
    // document.getElementById(`cart-cross-icon-${id}`)
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains(`cross-btn-${id}`)) {
            // document.getElementById(`single-cart-${id}`).innerHTML = "";
            const cart = e.target.closest(".cart");
            cart.innerHTML="";
            const currentPrice = parseInt(showTotal.innerText);
            total = currentPrice - price;
            showTotal.innerText = total;
        }

    })
    // removeCart = (id, price) => {
    // onclick="removeCart(${id},${price})"
    //     // const showTotal = document.getElementById('total-price')
    //      document.getElementById(`single-cart-${id}`).innerHTML = " ";
    //         const currentPrice = parseInt(showTotal.innerText);
    //         total = currentPrice - price;
    //         showTotal.innerText = total;
    //         console.log(currentPrice)
    //     // const cross = document.getElementById(`cart-cross-icon-${id}`)
    //     // cross.addEventListener('click', () => {

    //     // })

    // }

}

const displayDetail = (plant) => {
    const detailContainer = document.getElementById('detail-container')
    detailContainer.innerHTML = `<div class="card bg-base-100 shadow-sm rounded-xl">
                    <h2 class="card-title mt-4  items-start inter font-semibold">${plant.plants.name}</h2>
                    <figure class="px-1">
                        <img src="${plant.plants.image}" alt="Shoes" class="rounded-xl w-full md:h-[180px] h-40" />
                    </figure>
                    <div class=" text-left px-2 mt-4 space-y-2">
                        <p class=" font-semibold">Category:${plant.plants.category}</p>
                         <p class="price font-bold">Price:$${plant.plants.price}</p>
                        <p class="text-xs inter">Description:${plant.plants.description}
                        </p>
                    </div>
                </div>`
    document.getElementById('word_modal').showModal()
}

// display category card-----------------
const displayCategoryCard = (data) => {
    const categoryCardContainer = document.getElementById('card-container');
    categoryCardContainer.innerHTML = '';
    data.forEach(plant => {
        const categoryCard = document.createElement('div');
        categoryCard.innerHTML = `<div class="card bg-base-100 shadow-sm rounded-xl">
                        <figure class="px-1">
                            <img src="${plant.image}" alt="Shoes"
                                class="rounded-xl w-8/12 md:w-full md:h-[180px] h-40" />
                        </figure>
                        <div class="items-center text-left px-2 space-y-2">
                            <h2 onclick='loadCardDetail(${plant.id})' class="card-title mt-4 text-sm items-start inter font-semibold">${plant.name}</h2>
                            <p class="text-xs inter truncate">${plant.description}
                            </p>
                            <div class="flex justify-between">
                                <p class="bg-[#CFF0DC] text-[#15803D] rounded-lg px-2">${plant.category}</p>
                                <p class="font-bold">$<span id='price'>${plant.price}</span></p>
                            </div>
                            <div class="card-actions">
                                <button onclick="addToCart('${plant.name}',${plant.price},${plant.id})" class="add-btn btn bg-[#166534] text-white mb-2 rounded-3xl w-full">Add to
                                    Cart</button>
                            </div>
                        </div>
                    </div>`
        categoryCardContainer.append(categoryCard)
    })
    manageSpinner(false)
}
const displayCategories = (categories) => {
    // show the categories
    const categorieContainer = document.getElementById('categorie-container')
    categorieContainer.innerHTML = '';
    categories.forEach(category => {
        const categorieDiv = document.createElement('div')
        categorieDiv.innerHTML = `
            <div id="card-category-${category.id}" onclick="loadCategoryCard(${category.id})" class="category w-full rounded-lg hover:bg-[#166534] hover:text-white py-1 pr-6">
                <h1 class="text text-left pl-1">${category.category_name}</h1>
            </div>`
        categorieContainer.append(categorieDiv);
    });
    manageSpinner(false);
    // end show the categories
}

const displayCards = (plants) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    plants.forEach(plant => {
        // addTotal = () => {
        //     let total = 0;
        //     document.body.addEventListener('click', function (e) {
        //         if (e.target.classList.contains('add-btn')) {
        //             // jekhane total show hobe
        //             const totalPrice = document.getElementById('total-price')
        //             const card = e.target.closest(".card");
        //             // card er jekhane price ache oi id
        //             const priceText = card.querySelector('.price')
        //             // card er price
        //             const price = parseInt(priceText.innerText);
        //             total = total + price;
        //             totalPrice.innerText = total;
        //             console.log(total)
        //         }

        //     })
        // }
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `<div class="card bg-base-100 shadow-sm rounded-xl">
                        <figure class="px-1">
                            <img src="${plant.image}" alt="Shoes"
                                class="rounded-xl w-full md:h-[180px] h-40" />
                        </figure>
                        <div class=" items-center text-left px-2 space-y-2">
                            <h2 onclick="loadCardDetail(${plant.id})" class="card-title mt-4 text-sm items-start inter font-semibold">${plant.name}</h2>
                            <p class="text-xs inter truncate">${plant.description}
                            </p>
                            <div class="flex justify-between">
                                <p class="bg-[#CFF0DC] text-[#15803D] rounded-lg px-2">${plant.category}</p>
                                <p class=" font-bold">$<span id='price'>${plant.price}</span></p>
                            </div>
                            <div class="card-actions">
                                <button id="add-btn" onclick=" addToCart('${plant.name}',${plant.price},${plant.id})" class="add-btn btn bg-[#166534] text-white mb-2 rounded-3xl w-full">Add to
                                    Cart</button>
                            </div>
                        </div>
                    </div>`
        cardContainer.append(cardDiv)
    })
    manageSpinner(false);
}
// document.getElementById('add-btn').addEventListener('click', function () {
//     //1.get the container
//     const showTotal = document.getElementById('total-price')
//     //2.get the price
//     const plantPriceSpan = document.getElementById('price')
//     const plantPrice = Number(plantPriceSpan.innerText);
//     // 3.add the price
//     total = total + plantPrice;
//     // 4.price to container inner text
//     showTotal.innerText = total;
// })
// const id=()=>{
// fetch('https://openapi.programming-hero.com/api/plants')
// .then(res=>res.json())
// .then(data=>displayId(data.plants))
// }
// const displayId=(data)=>{
//     data.forEach(plant=>{
//         const id=`https://openapi.programming-hero.com/api/plant/${plant.id}`
//         console.log(id)
//     } )
// }

loadAllCards()
loadCategories()