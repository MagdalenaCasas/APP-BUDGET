//importar librerías
const compression = require("compression");
const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const expressJwt = require("express-jwt");
const cors = require("cors");

//puerto del servidor
const PORT = process.env.SERVER_PORT;

//importar modelos
const {
  Budget,
  User,
} = require("./models/index");

//JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

//crear instancia del server en express
const server = express();

//política de límite de peticiones
const limiter = rateLimit({
  windowMS: 120 * 1000,
  max: 10000000,
  message: "Excediste el número de peticiones. Intenta más tarde.",
});

//logger
const logger = (req, res, next) => {
  const path = req.path;
  const method = req.method;
  const body = req.body;

  process.nextTick(() => {
    console.log(`
        Método: ${method}
        Ruta: ${path}
        Body: ${JSON.stringify(body)}
        Params: ${JSON.stringify(req.params)}
        `);
  });

  next();
};

//middlewares globales
server.use(express.json());
server.use(compression());
server.use(cors());
server.use(helmet());
server.use(limiter);
server.use(logger);

server.use(
  expressJwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/login",],
  })
);

// .---- VERIFICAR ADMIN----------
const verifyAdminMiddleware = async (req, res, next) =>{
  const posibleUser = await User.findOne({
    where:{
      email: req.user.email
    }
  });
  if(!posibleUser.isAdmin){
    res.status(403);
    res.json({ error: `Sin permisos de administrador` });
  }
  next();
}


// ------ VERIFICAR USUARIO---------------
const verifyUserExistsMiddleware = async (req, res, next) =>{ 
  const posibleUser = await User.findOne({
    where:{
      email: req.body.email,
    }
  });
  if(posibleUser != null){
    res.status(406);
    res.json({ error: `El usuario ya existe en la base` });
  }else{

    next();
  }
};


//------------------------------------------------------------------------------------ENDPINTS-------------------------------------------


// no anda middleware de usuarios------



// NEW USUER
server.post("/newUser", verifyUserExistsMiddleware, async (req, res)=>{
  
  const {name,lastName,email,password,isAdmin} = req.body;
  try {
    await User.create({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        isAdmin: isAdmin,
    });
  
    res.status(201).json(`User created`);
    
  } catch (error) {
    res.status(400).json(error.message);
  }
})


//GET USERS

server.get("/users",verifyAdminMiddleware, async(req,res)=>{
  try{
    const arrayUsers = await User.findAll()
    const users = await arrayUsers.map((user)=>{
      return{
        user:{
          iduser: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          passwoerd: user.password,
          isAdmin: user.isAdmin
        }
      }
    })
    res.status(200).json(users)
  } catch(error){
    res.status(400).json(error.message)
  }
})

// PUT USER
server.put("/users/:id", async(req,res)=>{
  let idUser = req.params.id;
  const {name,lastName,email, password,isAdmin} = req.body;
  try {
      await User.update({name,lastName,email, password,isAdmin}, {where:{id: idUser}});
      const user = await User.findOne({where: {id: idUser}});

      if(user !== null){
          res.status(200).json(user)
      }else{
          throw new Error(`User with id: ${idUser} does not exist`)
      }

  }catch (error) {
      res.status(400).json({error: error.message})
  }
})


//DELETE USER
server.delete("/users/:id",async (req,res) =>{
  const idUser= req.params.id;
  
  const posibleUser= await User.findOne({
      where: {
          id:idUser,
      }
  })

  if(!posibleUser){
      res.status(404).json({
          error: `User with id: ${idUser} does not exist`
      });
  }else{  
      await User.destroy({
          where: {
            id:idUser,
          }
      }); 
  } 

  res.status(200).json("user has been deleted");
});


// LOGIN
server.post("/login",async (req,res)=>{
  const {email, password} = req.body;

  try{
      const posibleUser = await User.findOne({
          where: {
              email,
              password,
          },
      })

      if(posibleUser){
          const token = jwt.sign({
              //firmo solo con id, nombre y correo
              id: posibleUser.id,
              email: posibleUser.email,
              nombre: posibleUser.name,
              isAdmin: posibleUser.isAdmin,

          },JWT_SECRET, 
          {expiresIn: "120m"}
          );
          res.status(200).json({"token":token,"id":posibleUser.id});
      }else{
          res.status(401).json({
              error: "Email or password is incorrect"
          });
      }
  }catch (error) {
      console.log(error);
      res.status(500).json({
          error: "Error, try again later...",
      });
  }

});



//DELETE USER
server.delete("/budget/:id",async (req,res) =>{
  const idMov= req.params.id;
  
  const posibleMov= await Budget.findOne({
    where: {
      id:idMov,
    }
  })
  
  if(!posibleMov){
    res.status(404).json({
      error: `movement does not exist`
    });
  }else{  
    await Budget.destroy({
      where: {
        id:idMov,
      }
    }); 
  } 
  
  res.status(200).json("Movement has been deleted");
});


//--------------------------------------TABLA BUDGET-----------------------------
//BUDGET
server.get("/budget", async(req,res)=>{
  try {
      const movements = await Budget.findAll({
          where:{user_id: req.user.id}
      })
      res.status(200).json(movements)
  } catch (error) {
      res.status(400).json(error.message)
  }
})

// put movment
server.put("/budget/:id", async(req, res)=>{
  let id = req.params.id;
  const {amount,concept} = req.body;
  try {
      await Budget.update({amount,concept}, {where:{id: id}});
      const movement = await Budget.findOne({where: {id: id}});

      if(movement !== null){
          res.status(200).json(movement)
      }else{
          throw new Error(`The movment couldnt be found`)
      }

  }catch (error) {
      res.status(400).json({error: error.message})
  }
})

server.post("/budget", async (req,res) =>{
  console.log(req)
  try{const {type,amount,concept,user_id} = req.body;
  const newMovement = await Budget.create({
    type,
    amount,
    concept,
    user_id
  });

  res.status(201).json(newMovement);}
  catch(error){
   res.status(400).json({error:error.message});
  }
});


server.delete("/budget/:id", async(req, res)=>{
  let idMovement = req.params.id;

    const posibleMovement= await Budget.findOne({
      where: {
          id:idMovement,
      }
  })

  if(!posibleMovement){
      res.status(404).json({
          error: `No existe un movimiento con id ${idMovement}`
      });
  }else{  
      await Budget.destroy({
          where: {
            id:idMovement,
          }
      }); 
  } 
  res.status(200).json("El Movimieto fue eliminado");
})





//SERVER PORT LISTENER
server.listen(PORT, () => {
  console.log(`Servidor se ha iniciado en puerto ${PORT}`);
});


