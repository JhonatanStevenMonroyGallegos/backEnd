//const express = require ('express');
import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors';



const stringConexion ="mongodb+srv://JAL-DEVELOPERS:1234567890@sprint3.ouacy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client =new MongoClient(stringConexion,{
    useNewUrlParser:true,
    useUnifiedtopology: true,

});

let conexion;
const app= Express();
app.use(Express.json());
app.use(Cors());



app.get('/productos',(req, res)=>{
    console.log("alguien hizo get en la ruta /productos");
    conexion.collection("Productos").find({}).limit(50).toArray((err, result)=>{
        if(err){
            res.sendStatus(500).send('error consultando los productos');
        } else {
            res.json(result);
        }
    });
    
});

app.post('/productos/nuevo',(req,res)=>{
    //console.log("producto a crear:",req.body);
    //console.log('esto es una solicitud post a /productos/nuevo')
    const datosProducto = req.body;
    console.log('llaves: ', Object.keys(datosProducto));
    try{
        if (
            Object.keys(datosProducto).includes('IDproducto')||
            Object.keys(datosProducto).includes('producto')||
            Object.keys(datosProducto).includes('cantidad')
        ){
            conexion.collection('Productos').insertOne(datosProducto,(err, result)=>{
                if(err){
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
            
        } else{
            res.sendStatus(500);
        }
    } catch{
        res.sendStatus(500);
    }
});

app.patch('/productos/actualizar', (req, res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtroProducto = { _id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion ={
        $set: edicion,
    };
    conexion
    .collection('Productos')
    .findOneAndUpdate(
        filtroProducto, 
        operacion,
        {upsert:true,returnOriginal:true},
        (err, result)=>{
            if(err){
            console.error("error actualizando el producto",err);
            res.sendStatus(500);
            } else{
            console.log("actializado con exito ");
            res.sendStatus(200);
        }
    } );
});

app.delete('/productos/eliminar', (req, res)=>{
    const filtroProducto = { _id: new ObjectId(req.body.id)};
    conexion.collection('Productos').deleteOne(filtroProducto,(err, result)=>{
            if(err){
                console.error("error actualizando el producto",err);
                res.sendStatus(500);
            } else{
                console.log("actializado con exito ");
                res.sendStatus(200);
        }
    } );
});




const main =()=>{
    client.connect((err,db)=>{
        if (err){
            console.error("error conectando a la base de datos");
        }
        conexion =db.db('DBsprint3');
        console.log("conexion exitosa");
        return app.listen(5000,()=>{
                console.log('escuchando puerto 5000');
            });
    });
};

main();