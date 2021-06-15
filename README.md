# Club Inventory Management App

### Steps To Run the project, do the following steps:
1. Clone this repo to your system.
2. Open terminal in the cloned repo.
3. You will be needing two terminal windows one for the '/client' and one for '/server'.
4. Run command npm i in each of these terminal.
5. Create a '.env' file in '/server/config/', you can refer the .env.sample file and add the necessary credentials to run the app.
6. To run this app you will be needing a MongoAtlas Account and a cluster connection which will provide you the ATLAS_USERNAME and ATLAS_PASSWORD.
7. Also for the email notification system to work, you need to add your gmail account email address and password and allow less secure apps to access your google account.
8. Now you need to run the server first by typing the command 'node index.js'.
9. Now you can run your front end in the client repo by typing command 'npm start'. (You can also find a seperate readme file in client directory for more information)
10. You can see the app running at localhost:3000 in your browser.


### Features Implemented
This App has a login and signup functionality. 
It also has dashboards based on 4 different kinds of roles that are user, member, convener and admin.
This app has an email notification feature which sends an email to the member of any club if his request gets accepted or denied by any convener.
Admin is granted with some privileges like assigning a role to other members of a club or conveners of a club, he can also add a user who isn't part of any club to a new club. He can create new clubs as well.
Convener can add items to a his/her respective club, he can accept or deny member's requests based on the available items.
Member can request for available items and see the status of the requests made by them.

### Non-implemented/Planned Features
This App has a scope of getting an image upload system which is in progress using GridFS Storage for storing large images and using multer to facilitate file transfers and then rendering them in Base64 String format.

### References
1. https://nodejs.org/en/docs/
2. https://reactjs.org/docs/getting-started.html
3. https://docs.mongodb.com/manual/
4. https://mongoosejs.com/docs/guide.html
5. https://nodemailer.com/about/
6. https://getbootstrap.com/
7. https://react-bootstrap.github.io/

### Screenshots
<img width="600" alt="Home" src="https://user-images.githubusercontent.com/65703661/119985648-8cc17400-bfe0-11eb-958e-fc6f467c48b7.png">
<img width="600" alt="Login" src="https://user-images.githubusercontent.com/65703661/119985658-9054fb00-bfe0-11eb-9efc-60286399e063.png">
<img width="600" alt="Dashboard" src="https://user-images.githubusercontent.com/65703661/119985667-92b75500-bfe0-11eb-9287-1b85677e72f1.png">
