# Employee Tracker Application
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Technologies Used](#technologies-used)
* [Application Demo](#application-demo)
* [Contact Information](#contact-information)

## Description
This is a CLI-based application using a MySQL Database entitled "EmployeeTracker", Inquirer, and Console.Table to allow the user to query, view, insert, and modify data within the EmployeeTracker database housed inside of MySQL. This application, however, can be suit itself to the database of the user by modifying the connection information housed within the ```server.js``` file.

The user is able to use the following command in an integrated terminal to run the application:

<code>node server.js</code>

This command will then query the user with various options related to the database, such as "View All Employees," "Add New Employee," "Update Employee Role," etc. The information will be provided to the user in a table-form using ```console.table```.

Finally, the user can end the connection by selecting "Exit" from the list of options within the CLI.

## Installation
To install, the user may clone this GitHub Repository. Upon opening the repository in a coding application, the user to use <code>npm i</code> to install the necessary packages for this application (namely, ```inquirer```, ```mysql```, and ```console.table```).

With these packages installed, the user can use the ```schema.sql``` file for beginning the database, which houses the database's structure--that which is used by the ***Employee Tracker Application***. The database currently contains information for: department (ID and Name), role (ID, Title, Salary, and the Department ID), and employee (ID, First Name, Last Name, his/her Role ID, and his/her Manager's ID).

In the ```seed.sql``` file, the user will find preliminary data which can be inserted into the database as a starting point. This data may be easily modified to fit the user's purposes, provided it falls inn line with the underlying structure of the database itself.

With these structures in place, the user may use the following command to begin the application:

<code>node server.js</code>

## Technologies Used
Inquirer, MySQL, Console.Table, Node JS

## Application Demo
-------

## Contact Information
* Jarrod Bataille
  * Portfolio Webpage: https://jtbataille.github.io/
  * GitHub Profile: https://github.com/jtbataille
  * E-mail Address: jtbataille@gmail.com

- - -
Copyright © 2007 Free Software Foundation, Inc. <https://fsf.org/>
