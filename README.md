# API REST con Node.js y Express

API REST con Node.js y Express. Permite realizar el proceso CRUD sobre elementos o productos creados desde un archivo JSON con FS.

## Instalación

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina.

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Magaerv/API-REST.git

2. Navega al directorio del proyecto:

    ```bash
    cd api-rest-node-express

3. Instala las dependencias:

   ```bash
   npm install

4. Inicia la aplicación:

   ```bash
   npm start

# Uso

   ```bash
   Endpoint para obtener todos los items: GET /api/products

   ```bash
   Endpoint para obtener un item por ID: GET /api/products/:id

   ```bash
   Endpoint para crear un nuevo item: POST /api/products

   ```bash
   Endpoint para actualizar un item existente: PUT /api/products/:id

   ```bash
   Endpoint para eliminar un item: DELETE /api/products/:id