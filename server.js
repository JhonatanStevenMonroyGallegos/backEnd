//const express = require ('express');
import Express from 'express';

const app= Express();
app.use(Express.json());



app.get('/productos',(req, res)=>{
    console.log("alguien hizo get en la ruta /productos");
    const Productos =[
        {IDProducto:"",
        producto:"",
        cantidad:""},
        {IDProducto:"",
        producto:"",
        cantidad:""},
        {IDProducto:"",
        producto:"",
        cantidad:""
    }
    ];
    res.send(Productos);
});

app.post('/productos/nuevo',(req,res)=>{
    //console.log("producto a crear:",req.body);
    //console.log('esto es una solicitud post a /productos/nuevo')
    const datosProducto = req.body;
    console.log('llaves: ', Object.keys(datosProducto));
    try{
        if (
            Object.keys(datosProducto).includes('IDproducto')&&
            Object.keys(datosProducto).includes('producto')&&
            Object.keys(datosProducto).includes('cantidad')
        ){
            res.sendStatus(200);
        } else{
            res.sendStatus(500);
        }
    } catch{
        res.sendStatus(500);
    }
});


app.listen(3000,()=>{
    console.log('escuchando puerto 3000')
})