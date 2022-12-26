# GDSC-project

## live link for project [Students Bucket](https://gdsc-project-three.vercel.app/)

## Table of contents

- Introduction
- features
- packages
- Installation
- Drawbacks
- Improvements

## Introduction

There is a basic home page with only two buttons in menu `Home` is for default landing page and `Show All User` is to get all data that stored in database.

 ## features
 
 - You can add your data along with profile picture.
 - We use Asynchronous JavaScript And XML([AJAX](https://www.w3schools.com/xml/ajax_intro.asp)) which loades content for you without reloading page😉.
 - You can Search some specific user by there name and we use
 mongodb [Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/) to match,group and sort data for you.
 
 ## packages
 we use following packages in this project:
 - Express
 - mongoose
 - dotenv
 - path
 - nodemon(for dev works)
 - body-parser
 
 ## Installation
 
 you can install them just by `npm i` and after that run with `npm start`.
 
 ## Drawbacks
 
 There is some drawbacks with this project 🙁 and some of them are:
 
 - We are here storing the image in mongodb itself by encoding the image (base64), which introduce `Database latency`.
 - We are here using old way ajax for intracting with server side.
 
 ## Improvements
 
 - We can use some web services like `AWS` or `Google cloud` to store our data.
 - We can use some javascript libraries like `React`.
