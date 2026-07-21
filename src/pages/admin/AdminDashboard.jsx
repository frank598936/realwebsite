import { useEffect, useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import API from "../../api/authApi";


export default function AdminDashboard() {


  const [stats, setStats] = useState({

    totalUsers: 0,

    totalDeposits: 0,

    approvedDeposits: 0,

    pendingDeposits: 0,

    totalWithdrawals: 0,

    approvedWithdrawals: 0,

    pendingWithdrawals: 0,

  });



  const [loading, setLoading] = useState(true);



  useEffect(()=>{


    async function loadStats(){


      try {


        const response = await API.get(
          "/admin/stats"
        );


        setStats(response.data);



      } catch(error){


        console.log(error);


      } finally {


        setLoading(false);


      }


    }



    loadStats();



  },[]);





  if(loading){

    return (

      <DashboardLayout>

        <h2>Loading dashboard...</h2>

      </DashboardLayout>

    );

  }





  return (

    <DashboardLayout>


      <section className="dashboard-section">


        <h2>
          Admin Dashboard
        </h2>



        <div className="stats-grid">


          <div className="stat-card">

            <h3>Total Users</h3>

            <p>{stats.totalUsers}</p>

          </div>




          <div className="stat-card">

            <h3>Total Deposits</h3>

            <p>
              ${stats.totalDeposits.toLocaleString()}
            </p>

          </div>




          <div className="stat-card">

            <h3>Approved Deposits</h3>

            <p>
              ${stats.approvedDeposits.toLocaleString()}
            </p>

          </div>





          <div className="stat-card">

            <h3>Pending Deposits</h3>

            <p>
              {stats.pendingDeposits}
            </p>

          </div>





          <div className="stat-card">

            <h3>Total Withdrawals</h3>

            <p>
              ${stats.totalWithdrawals.toLocaleString()}
            </p>

          </div>





          <div className="stat-card">

            <h3>Approved Withdrawals</h3>

            <p>
              ${stats.approvedWithdrawals.toLocaleString()}
            </p>

          </div>





          <div className="stat-card">

            <h3>Pending Withdrawals</h3>

            <p>
              {stats.pendingWithdrawals}
            </p>

          </div>



        </div>


      </section>


    </DashboardLayout>

  );

}