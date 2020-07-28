# UserStoriesDemo

Please follow the below instructions to setup and run the API Server.

1) This application assumes that mysql is installed on the machine and can be connected with the nodejs application.

2) Open mySQL Workbench and run the command 'create database userstories;'

3)Then open the application root folder in a terminal and run the command 'npm i'. This will install all the dependency packages under node_modules folder.

4)After successfully completed the above step, run 'npm run initusers'. This will seed the required data in DB.

5)Now its time to run the application using the command 'npm start'

6) A copy of sample requests are attached under the folder 'samples/demo.postman_collection.json'. This file should be imported using Postman and execute the requests.