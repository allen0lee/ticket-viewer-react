# ticket-viewer-react

### 1. Solution summary
This solution is a React frontend visualizes different views (`tickets_list.erb`, `ticket_deatils.erb`, `error.erb`) created by the `ticket_viewer` Ruby Sinatra backend, which is developed using MVC. Repo for the backend is [here](https://github.com/allen0lee/ticket_viewer). <br /><br />
Technologies used: react, react-router, moment

### 2. How to run this frontend
1. Install dependencies<br />
Clone this solution repo to your machine, inside the repo directory, type the following in terminal window: `npm i`<br />
This will install the dependencies required to run the frontend.

2. Turn on the backend<br />
First you need to have the backend ready (repo is [here](https://github.com/allen0lee/ticket_viewer), check the `readme` for how to prepare the backend).<br />
After finish configuring the backend, to turn on the server, in the backend repo directory window, type: `rackup config.ru`

3. See the result<br /> 
In this repo directory window, run the solution by typing: `npm start`<br />
This should pop out your web browser, and you can view the solution (Or you can type in web browser: `localhost:3000`).<br />
You will see the 1st page of a list of tickets.<br />
You can navigate between pages by clicking the page numbers at the bottom.<br />
You can see the details of each ticket by clicking their subjects.

4. Run the test<br />
This solution provides test on:
* Whether response of valid tickets is coming back from my Ruby Sinatra backend
* Whether response of single ticket details is coming back from my Ruby Sinatra backend
<br /><br />
The test file is in `src/test`. To run the test, inside the repo folder, type: `npm test`<br />
Press `a` to run all tests. Then you should see the result.