FROM node:18

WORKDIR /app

# Copia solo los archivos de dependencias primero para aprovechar la caché
COPY package*.json ./

# Instala dependencias
RUN npm install

# Luego copia el resto del proyecto
COPY . .

# Expone el puerto 3000 del contenedor
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "src/server.js"]