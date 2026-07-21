import { useEffect, useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import {
  getAllWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
} from "../../api/authApi";

import Notification from "../../components/Notification";



export default function AdminWithdrawals() {


  const [withdrawals,setWithdrawals] = useState([]);



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








  async function loadWithdrawals(){


    try{


      const response = await getAllWithdrawals();


      setWithdrawals(response.data);



    }catch(error){


      console.log(error);


    }


  }






  useEffect(()=>{


    loadWithdrawals();


  },[]);








  async function handleApprove(id){


    try{


      await approveWithdrawal(id);



      showNotification(

        "Withdrawal approved successfully",

        "success"

      );



      loadWithdrawals();



    }catch(error){


      showNotification(

        error.response?.data?.message ||

        "Approval failed",

        "error"

      );


    }


  }







  async function handleReject(id){


    try{


      await rejectWithdrawal(id);



      showNotification(

        "Withdrawal rejected successfully",

        "success"

      );



      loadWithdrawals();



    }catch(error){


      showNotification(

        error.response?.data?.message ||

        "Rejection failed",

        "error"

      );


    }


  }








return (

<DashboardLayout>



<Notification

message={notification.message}

type={notification.type}

/>






<section className="dashboard-section">



<h2>

Withdrawal Requests

</h2>







<div className="table-container">


<table>


<thead>


<tr>


<th>ID</th>

<th>User</th>

<th>Amount</th>

<th>Method</th>

<th>Details</th>

<th>Status</th>

<th>Date</th>

<th>Action</th>


</tr>


</thead>








<tbody>



{

withdrawals.length === 0 ? (


<tr>


<td colSpan="8">

No withdrawals found

</td>


</tr>



)

:





withdrawals.map((item)=>(


<tr key={item.id}>


<td>

{item.id}

</td>





<td>

{item.name || item.user_id}

</td>





<td>

${Number(item.amount).toLocaleString()}

</td>





<td>

{item.method}

</td>







<td>


{

item.withdrawal_type === "crypto"


?


item.wallet_address



:



`${item.bank_name || ""} - ${item.account_name || ""} - ${item.account_number || ""}`



}



</td>








<td

className={

item.status === "Approved"

?

"status-success"

:

item.status === "Rejected"

?

"status-failed"

:

"status-pending"

}

>


{item.status}


</td>








<td>


{

new Date(item.created_at)

.toLocaleString()

}


</td>








<td>


{

item.status === "Pending" &&


<>


<button

className="approve-btn"

onClick={()=>handleApprove(item.id)}

>

Approve

</button>






<button

className="reject-btn"

onClick={()=>handleReject(item.id)}

>

Reject

</button>


</>



}



</td>






</tr>


))


}



</tbody>



</table>



</div>





</section>





</DashboardLayout>

);


}