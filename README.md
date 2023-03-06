# Secret-Site
 
Went through the 6 level of Security + using environment variables

View each level of security in the git log

- Level 1 - Username and Password Only
- Level 2 - Encryption
- Level 3 - Hashing with md5
- Level 4 - Hashing and Salting with bcrypt
- Level 5 - Cookies and Sessions
- Level 6 - Google OAuth 2.0 Authentication

Features:
- Authentication and restricted urls
- Google OAuth to login/register
- Ability to register/create using local credentials. Password is hashed and salted for protection

How to run application:
- Start a MongoDB Shell
- Download repository
- Open downloaded repository with a command line interface
- Set up OAuth API on https://console.developers.google.com/ 
- On link above, also set up a credential as 'Web application', then save Client ID and Client Secret in the .env
- Run 'npm install' and then 'nodemon app.js' in terminal in root directory of repository
- Visit the site by opening a browser and going to the url: 'localhost:3000'

Homepage:

![alt text](https://github.com/J0K3Rn/Secret-Site/blob/main/screenshots/homepage.png?raw=true) 

Register Page:

![alt text](https://github.com/J0K3Rn/Secret-Site/blob/main/screenshots/register.png?raw=true) 

Secrets Page:

![alt text](https://github.com/J0K3Rn/Secret-Site/blob/main/screenshots/secrets1.png?raw=true) 

Secret Post Page:

![alt text](https://github.com/J0K3Rn/Secret-Site/blob/main/screenshots/secret_post.png?raw=true) 

Secrets Page Updated:

![alt text](https://github.com/J0K3Rn/Secret-Site/blob/main/screenshots/secrets2.png?raw=true) 