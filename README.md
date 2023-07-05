# How to use an API connected with a Disney Star Wars database

Greetings everyone. If you are reading this I suppose you do not know about Javascript and Microsoft SQL Server

# **Let's start**
## What are these technologies?

![Javascript](https://muytecnologicos.com/wp-content/uploads/2023/01/Ventajas-y-desventajas-de-javascript.jpeg)  

JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.

JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.[10] It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).

The ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.


![Javascript](https://www.globalbit.co/wp-content/uploads/2019/05/sql-cover-blog.png)

Microsoft SQL Server is a proprietary relational database management system developed by Microsoft. As a database server, it is a software product with the primary function of storing and retrieving data as requested by other software applications—which may run either on the same computer or on another computer across a network (including the Internet). Microsoft markets at least a dozen different editions of Microsoft SQL Server, aimed at different audiences and for workloads ranging from small single-machine applications to large Internet-facing applications with many concurrent users.

# **Everything you need to do before running the proyect!**

This API is not uploaded it to the web so you have to initialize it by yourself:

 1) You have to install npm, Microsoft SQL Server and Postman:
If you do not have either of the two, here are the links to install them

[Npm](https://docs.npmjs.com/cli/v6/commands/npm-install)

[DataBase](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

To use Postman, you have two ways:

-The first one is to open Postman on the web

-And the other way is downloading it. If you want to download it, here is the link:

[Postman](https://www.postman.com/)



2) Then you have to open the proyect and install npm with the next command:
 
-npm i  (or npm install)

3) And finally you have to change in the .env file the SERVER name to the name of your Database. You should be something like this:

![Captura2](https://github.com/titanfede25/Disney/assets/111746138/f9165bb0-2304-46f4-b056-afbb07215a48)


   
# Let's run it!

When you have finished installing and downloading everything, you have to  execute the query (the .sql file) in the databese and run  and  later you have to use in the proyect the next command: 

-npm start

 After starting the proyect, it is not necessary to write this command again because it is using [Nodemon](https://www.oreilly.com/library/view/server-side-development/9781789345391/e2ac19e3-1bb0-4a10-8baf-3ea96b77c5b2.xhtml).   


# How to use it!
The first thing you should see is the number of the port (3001)



https://guru99.com/postman-tutorial.html
Then in the Postman you have to put in the URL input "http://localhost:3001/..."
