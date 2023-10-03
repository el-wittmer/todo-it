# Todo List

Allows the user to maintain two todo lists, one for tasks which need to be done today and tasks for work. This version contains persistent data stored in a database.

Requires node.js and MongoDB server installation to run. 
[MongoDB installation docs](https://www.mongodb.com/docs/manual/administration/install-community/)


From root, install dependencies using command line:
- $ `npm install -g npm`
- $ `npm init -y`
- $ `npm i`

After these steps, a folder called `node_modules` should appear. 

To run: 
- Start the server using `nodemon index.js` in the command line. If nodemon is not installed, install using `npm i nodemon`
- Open `localhost:3000` in the browser to view. 

## Explanation:
This project works through HTML `get` and `post` methods. These methods allow data to be stored in a non-persistent server, allowing for the temporary storage of tasks. The `post` method gets data from the New Item form and adds it to the running list of tasks. The `get` method displays the relevant tasks. 

Disclaimer: Restarting the server will erase all added tasks. 