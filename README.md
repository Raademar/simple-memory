# Simpleton Memory Life

Train your brain

## Getting Started

### Installing

* Clone or Fork

* Make sure you have Node.js & MongoDB installed.

* Navigate to your project folder and run:
```
npm install --save
```
* Highscores are saved to a live mlab database. You need to set up your own connection string in a .env file. 
It should look something like this.
```
MONGOLAB_URI="mongodb://USERNAME:PASSOWRD@DATABASE.mlab.com:PORT/simple-memory"
```
* If all the above is followed you can init the node server with.
```
node app.js
```
* If your console says that the database is connected you can navigate to http://localhost:80.

#### If everything is working you should see something like the picture below

![screenshot_of_game](https://i.imgur.com/1RbkqI5.png)

## Built With


* [JavaScript](https://javascript.com)
* [Node.js](https://nodejs.org)
* [Mongoose](https://mongoosejs.com)
* [Pugjs](https://pugjs.org)


## Authors

* **Mattias Rådemar** - [Raademar](https://github.com/Raademar)

## This site has been tested by.

* [Hanna White](https://hannawhite.se)
* [André Broman](https://github.com/laykith)
* [Per Baltzar](https://github.com/perbaltzar)
* [Adrian Jungnelius](https://github.com/AdrianJung)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Hat tip to all the open source heroes out there.
