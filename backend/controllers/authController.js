const supabase = require("../config/supabase");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



// =====================================
// REGISTER USER
// =====================================

exports.register = async (req, res) => {

  try {


    const {

      name,

      email,

      phone,

      country,

      password

    } = req.body;




    if(!name || !email || !password){

      return res.status(400).json({

        message:"Name, email and password are required"

      });

    }





    // Check existing user

    const { data: existingUser } = await supabase

      .from("users")

      .select("id")

      .eq("email", email)

      .single();





    if(existingUser){

      return res.status(400).json({

        message:"Email already exists"

      });

    }







    // Hash password

    const hashedPassword = await bcrypt.hash(

      password,

      10

    );







    const { data:user, error } = await supabase

      .from("users")

      .insert([

        {

          name,

          email,

          phone,

          country,

          password:hashedPassword,

          role:"user",

          balance:0,

          profit:0,

          bonus:0,

          blocked:false

        }

      ])

      .select()

      .single();







    if(error){

      return res.status(400).json({

        message:error.message

      });

    }







    res.status(201).json({

      message:"User registered successfully",

      user

    });







  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};









// =====================================
// LOGIN USER
// =====================================

exports.login = async(req,res)=>{


  try{



    const {

      email,

      password

    } = req.body;






    if(!email || !password){


      return res.status(400).json({

        message:"Email and password are required"

      });


    }







    // Find user

    const { data:user, error } = await supabase

      .from("users")

      .select("*")

      .eq("email",email)

      .single();







    if(error || !user){


      return res.status(400).json({

        message:"Invalid email or password"

      });


    }







    // Check blocked account

    if(user.blocked){


      return res.status(403).json({

        message:"Your account is blocked"

      });


    }







    // Compare password

    const passwordMatch = await bcrypt.compare(

      password,

      user.password

    );







    if(!passwordMatch){


      return res.status(400).json({

        message:"Invalid email or password"

      });


    }








    // Create JWT token

    const token = jwt.sign(

      {


        id:user.id,


        role:user.role,


        email:user.email


      },


      process.env.JWT_SECRET,


      {


        expiresIn:"7d"


      }


    );








    res.json({


      message:"Login successful",


      token,



      user:{


        id:user.id,


        name:user.name,


        email:user.email,


        phone:user.phone,


        country:user.country,


        role:user.role,


        balance:user.balance,


        profit:user.profit,


        bonus:user.bonus,


        blocked:user.blocked



      }



    });







  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};