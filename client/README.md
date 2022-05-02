# Famous Founder
## Reto Nomada

## # Description
Este repositorio presenta los resultados del **Reto Nomada** para el puesto de **Desarrollador React Native Jr.**
El desafio consiste en realizar una interfaz en React Native, que permita a los usuarios encontrar a un famoso, del cual no se sabe el nombre, pero se tiene una foto del mismo.
Esta compuesto por React Native en conjunto de **react-navigation** y **Redux**. 
Tambien se utilizó la **API de Nomada**, para encontrar el nombre del famoso, y la API **MovieDB**, para obtener la informacion de la persona. 
Este proyecto se ha probado con éxito utilizando: 
    node: v16.13.1
    npm: 8.3.0

### Installing
==>Antes de empezar: Se debe tener instalado expo en el celular(**expo** en android **expo go** en iOS). 
Download and run npm install. 
```
> git clone https://github.com/alx4329/Famous-Founder-Native.git
>cd client
> npm i
```
Antes de hacer correr la app, se debe crear el archivo .env con las contraseñas necesarias para el pedido a las API. 

```
    NOMADA_API_KEY=
    MOVIEDB_API_KEY=
```
Luego desde del directorio de client, hacer: 

```
> npm start
```
En la consola se mostrará el puerto en el que se escuchará el servidor de expo, por ejemplo **http://localhost:19002**. Aqui se puede escanear el codigo QR y abrir la aplicacion en la app de expo. 

