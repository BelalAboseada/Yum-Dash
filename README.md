<h1>Yum Dash</h1>
<p><em>Food Delivery App</em></p>


## Features:
- User authentication with username and password.
- Ability to create, read, update, delete (CRUD) restaurant profiles.
- Restaurants can add/remove items from their menu.
- Users can search for restaurants by name or cuisine type.
- Users can view a restaurant's profile including its menu and contact information.
- Users can place orders for one or multiple items at once.
- Users receive an email confirmation of their order when they make a purchase.

## Technologies Used:
- React
- Redux
- ReactStrap
- Firebase
- Axios
- sass 
- Python and  Django REST Framework for backend development
- SQl Lite

## Installation & Usage Instructions:
To run this project locally on your machine you will need Node.js installed along with npm package manager
1. Clone the repository using `git clone https://github.com/BelalAboseada/YumDash.git
2. Navigate to the root directory of the cloned repo in your terminal
3. Run `npm install` to install all required dependencies
4. Create a `.env` file in the root folder and copy the contents of `.env.
5. In the `.env` file replace `<your-secret>` with any random string. This
secret is used as the JWT encryption key.
6. To start the server run 
```
npm run dev
```
The app should now be running on http://localhost:8000/. Any changes made to
the files will automatically refresh the page in the browser.
