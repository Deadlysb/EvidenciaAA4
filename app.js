require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const values = require('./models/values');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(express.json());

const swaggerOption = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API valores',
            version: '1.0.0',
            description: 'API para gestionar los valores'
        },
        servers: [
            {
                url: 'https://evidenciaaa4-production.up.railway.app/'
            },
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: ['./app.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());

const MONGO_URI = process.env.Urlmongodb;

mongoose.connect(MONGO_URI).then(()=>{
    console.log('Se conectó exitosamente con MongoDB');
}).catch((err)=>{
    console.error('Error encontrado',err);
})

/**
* @swagger
* /values:
*   post:
*     summary: Crear un nuevo valor
*     requestBody: 
*          required: true
*          content:
*             application/json:
*                   schema:
*                      type: object
*                      properties:
*                           label:
*                               type: string
*                           data:
*                               type: number
*                      required:
*                           - label
*                           - data
*     responses:
*           201:
*               description: Valor se registro correctamente
*           400: 
*               description: Error al registrar
*/

app.post('/values', async (req, res)=>{
    try {
        const nuevoDato = new values(req.body);
        await nuevoDato.save();
        res.status(201).json({message: 'Se guardó correctamente'});
    } catch (err){
        console.error(err);
        res.status(500).json({message: 'Error al guardar'});
    }
});

/**
* @swagger
* /values:
*   get:
*     summary: Obtiene todos los valores
*     responses:
*           200:
*               description: Lista completa de valores
*           400: 
*               description: Error al listar
*/

app.get('/values', async (req, res)=>{
    try {
        const listadoValores = await values.find();
        res.status(200).json(listadoValores);
    }
    catch {
        res.status(400).json({message: "Error al listar"});
    }
});

app.listen(5000, ()=>{
    console.log('Levantado correctamente');
});