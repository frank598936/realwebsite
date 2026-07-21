import { useEffect, useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import {
  getAllUsers,
  toggleBlockUser,
  updateUserProfitBonus,
} from "../../api/authApi";

import Notification from "../../components/Notification";



export default function AdminUsers() {


  const [users,setUsers] = useState([]);

  const [search,setSearch] = useState("");



  const [showEdit,setShowEdit] = useState(false);

  const [selectedUser,setSelectedUser] = useState(null);



  const [profit,setProfit] = useState("");

  const [bonus,setBonus] = useState("");





  const [notification,setNotification] = useState({

    message:"",

    type:""

  });






  function showNotification(message,type){


    setNotification({

      message,

      type

    });



    setTimeout(()=>{


      setNotification({

        message:"",

        type:""

      });


    },3000);


  }







  async function loadUsers(){


    try{


      const response = await getAllUsers();


      setUsers(response.data);



    }catch(error){


      console.log(error);


    }


  }







  useEffect(()=>{


    loadUsers();


  },[]);








  async function toggleBlock(id){


    try{


      await toggleBlockUser(id);



      showNotification(

        "User status updated successfully",

        "success"

      );



      loadUsers();



    }catch(error){


      showNotification(

        error.response?.data?.message ||

        "Action failed",

        "error"

      );


    }


  }








  function openEdit(user){


    setSelectedUser(user);


    setProfit(user.profit || 0);


    setBonus(user.bonus || 0);


    setShowEdit(true);


  }








  async function saveProfitBonus(){


    try{


      await updateUserProfitBonus(

        selectedUser.id,

        {

          profit,

          bonus

        }

      );




      showNotification(

        "Profit and bonus updated successfully",

        "success"

      );





      setShowEdit(false);


      loadUsers();




    }catch(error){


      showNotification(

        error.response?.data?.message ||

        "Update failed",

        "error"

      );


    }


  }








  const filteredUsers = users.filter((user)=>


    user.name

    .toLowerCase()

    .includes(search.toLowerCase())



    ||



    user.email

    .toLowerCase()

    .includes(search.toLowerCase())


  );







return (

<DashboardLayout>




<Notification

message={notification.message}

type={notification.type}

/>







<section className="dashboard-section">



<h2>

User Management

</h2>








<input

className="search-input"

placeholder="Search user..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>








<div className="table-container">


<table>



<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Email</th>

<th>Balance</th>

<th>Profit</th>

<th>Bonus</th>

<th>Status</th>

<th>Edit</th>

<th>Action</th>

</tr>

</thead>







<tbody>


{

filteredUsers.length === 0 ? (


<tr>

<td colSpan="9">

No users found

</td>

</tr>



)

:





filteredUsers.map((user)=>(


<tr key={user.id}>


<td>

{user.id}

</td>





<td>

{user.name}

</td>





<td>

{user.email}

</td>





<td>

${Number(user.balance || 0).toLocaleString()}

</td>





<td>

${Number(user.profit || 0).toLocaleString()}

</td>





<td>

${Number(user.bonus || 0).toLocaleString()}

</td>







<td>


{

user.blocked ?


<span className="status-failed">

Blocked

</span>



:



<span className="status-success">

Active

</span>



}



</td>








<td>


<button

className="approve-btn"

onClick={()=>openEdit(user)}

>

Edit

</button>


</td>







<td>


<button

className="approve-btn"

onClick={()=>toggleBlock(user.id)}

>


{

user.blocked

?

"Unblock"

:

"Block"

}



</button>


</td>





</tr>


))


}



</tbody>




</table>


</div>





</section>









{

showEdit &&


<div className="modal">


<div className="modal-box">


<h3>

Edit Profit & Bonus

</h3>





<p>

User: {selectedUser.name}

</p>







<input

type="number"

placeholder="Profit"

value={profit}

onChange={(e)=>setProfit(e.target.value)}

/>







<input

type="number"

placeholder="Bonus"

value={bonus}

onChange={(e)=>setBonus(e.target.value)}

/>







<button

className="approve-btn"

onClick={saveProfitBonus}

>

Save Changes

</button>








<button

className="reject-btn"

onClick={()=>setShowEdit(false)}

>

Cancel

</button>





</div>


</div>


}




</DashboardLayout>

);


}