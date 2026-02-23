
const url = "https://crudcrud.com/api/aa900d55b25a4030a21c1ae9fb934c61/MovieBooking"

const form =document.getElementById("bookingForm")
const userList =document.getElementById("userList")
const totalspan =document.getElementById("total")
const  searchinput =document.getElementById("search")

window.addEventListener("DOMContentLoaded",getUsers)

form.addEventListener("submit" ,function (event) {
    event.preventDefault();

    const user ={
        name:document.getElementById("username").value,
        seat:document.getElementById("seat").value
    }
    axios.post(url,user)
    .then((res)=>{
        displayUser(res.data)
        form.reset()
        updateTotal()
    })
})

function getUsers(){
    axios.get(url)
    .then((res)=>{
        userList.innerHTML="";
        res.data.forEach(displayUser);
        totalspan.textContent = res.data.length
    })
}

function displayUser(user){
    const li = document.createElement("li")

    li.textContent=`${user.name} - Seat ${user.seat}`

    const btnbox = document.createElement("div")

    const delbtn = document.createElement("button");
    delbtn.textContent="Delete";
    delbtn.onclick =()=> deleteUser(user._id)

    const editbtn =document.createElement("button")
    editbtn.textContent="Edit";
    editbtn.onclick = () => editUsers(user)

    btnbox.appendChild(delbtn)
    btnbox.appendChild(editbtn)
    li.appendChild(btnbox)

    userList.appendChild(li)
}

function deleteUser(id){
    axios.delete(`${url}/${id}`)
    .then(getUsers)
}

function editUsers(user){
    document.getElementById("username").value=user.name;
    document.getElementById("seat").value=user.seat;
    deleteUser(user._id)
}

function updateTotal(){
    axios.get(url)
    .then((res) => {
        totalspan.textContent=res.data.length
    })
}

searchinput.addEventListener("input",function () {
    const value = searchinput.value;

    axios.get(url)
    .then((res)=>{
        userList.innerHTML="";
        res.data.filter((user)=>
        user.seat.toString().includes(value))
        .forEach(displayUser)
    })
})