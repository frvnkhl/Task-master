# Task master

## Project description
Task master is my first full-stack project that includes technologies such as authentication via 3rd party (google & facebook), implementing JWT, rendering data from the database, editing it on the frontend and reflect those changes on the backend. I played around with my client side, to make the tasks be shown in different ways as a list, kanban board and calendar. This showed me the world of different React 3rd party component and how to debug if things don't work together well.

This app is very special for me, even though I already knew how to do all those things, I never did them together. Building this app was a great learning experience, since I aspire to be a full-stack developer and getting things work together is quite a challenge for the first time. I used MERN stack. For my backend I used Node.js, Express and MongoDB. I made frontend using React. The backend of my app is deployed on Heroku servers, frontend is hosted on firebase.

### Main features
- Register to the app with username & password
- Secure the passwords in the db with the help of hashing
- Login to the app with the help of JWT
- Login/register to the app via 3rd party, Google and Facebook
- Show tasks in three ways, list, calendar and kanban board
- Calendar and kanban board views allow you to change the tasks' information also via drag and drop feature
- The tasks can be fully edited, removed or added via client side

### App demo
Link to the app is: https://task-master-350012.web.app/

If you want to try the tasks, you need to register (you can use fake email and easy password as there are no restrictions for it). If you want to try to register/login via 3rd party, you can contact me later to delete your information from my db.

## Dependencies

### Backend
- bcrypt
- body-parser
- connect-ensure-login
- cors
- dotenv
- express
- express-session
- jsonwebtoken
- mongoose
- mongoose-findorcreate
- passport
- passport-facebook
- passport-google-oauth20
- passport-jwt
- passport-local-mongoose

### Frontend
- chakra-ui
- @fortawesome
- @fullcalendar
- axios
- firebase
- jwt-decode
- postcss-cli
- query-string
- react
- react-router
- react-trello

