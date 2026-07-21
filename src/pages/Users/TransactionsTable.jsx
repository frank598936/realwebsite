import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import { getUserTransactions } from "../../api/authApi";


export default function TransactionsTable() {


  const { user } = useContext(AuthContext);



  const [transactions,setTransactions] = useState([]);


  const [loading,setLoading] = useState(true);







  async function loadTransactions(){


    try{


      const response = await getUserTransactions(user.id);


      setTransactions(response.data);



    }catch(error){


      console.log(error);


    }finally{


      setLoading(false);


    }


  }







  useEffect(()=>{


    if(user){


      loadTransactions();



      const interval = setInterval(()=>{


        loadTransactions();


      },10000);




      return ()=>clearInterval(interval);


    }



  },[user]);







return (

<div className="table-container">


<h2>

Recent Transactions

</h2>





<table>



<thead>


<tr>


<th>Type</th>


<th>Amount</th>


<th>Method</th>


<th>Status</th>


<th>Date</th>



</tr>


</thead>







<tbody>



{

loading ? (


<tr>

<td colSpan="5">

Loading transactions...

</td>

</tr>



)

:





transactions.length === 0 ? (


<tr>

<td colSpan="5">

No transactions found

</td>

</tr>



)

:



transactions.map((item)=>(


<tr key={item.id}>


<td>

{item.type}

</td>





<td>

${Number(item.amount).toLocaleString()}

</td>






<td>

{item.method}

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

.toLocaleDateString()

}


</td>






</tr>


))


}



</tbody>



</table>



</div>

);


}