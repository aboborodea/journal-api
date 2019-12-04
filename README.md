<h1>Open Thought</h1>
<h4>Open Thought is an online journal where you can write freely about your biggest hopes and dreams, your favorite memories, or whatever is on your mind.</h4>

<h4>Important Links</h4>
-   [Client Deployed Link](https://aboborodea.github.io/journal/)
-   [Client GitHub Link](https://github.com/aboborodea/journal)
-   [Backend Deployed Link](https://dry-basin-07175.herokuapp.com)
-   [Backend GitHub Link](https://github.com/aboborodea/project_2_api)

<h4>Technologies Used</h4>
<ul>
<li>Atom</li>
<li>cURL</li>
<li>Heroku</li>
<li>Postman</li>
<li>PostgreSQL</li>
<li>GitHub</li>
<li>Express</li>
</ul>

<h4>Document Planning</h4>
  <p>
  For my capstone project, I created an application that allows users to write and reflect in an online journal. While my experience in this bootcamp has been a whirlwind, I have lost touch with my daily ritual: journaling each day upon waking up. This project was created with the intention and hope to reinvigorate this practice for myself and others. For a future version, I aspire to add a social aspect, where users can interact with one another through their posts.

  I began by creating very detailed user stories (through a new app, Sketch), wireframes, and ERDs. This use of time for planning was extremely beneficial, as I had a solid understanding of the direction that I wanted to go in when building both the front and back end. Although styling and CSS are not my strength, I am excited to expand and strenthen these skills by giving my application a clean and minimalistic journal-feeling environment.

  Next, I began building the backend of my project using Express. With users and journal entries as my resources, I tested CRUD actions on the entries. For version one of Open Thought, I built the backend to require a token and authentication, so that a user can only create, view, update, and delete their own journal entries.

  Once my backend was up and running, I moved onto my client facing application. I used React and its component based framework to build out a structure for my program. I created individual components for each CRUD action on journal entries and tested each with curlscripts. From here, I started to add content to the page with a combination of newly learned JSX, React, and CSS. I added web page functionality for a user to be able to create, update, view (one and all entries), and delete an entry.
  </p>

<h4>User Stories</h4>
<ul>
<li>As an unregistered user, I would like to sign up with email and password.</li>
<li>As a registered user, I would like to sign in with email and password.</li>
<li>As a signed in user, I would like to change password.</li>
<li>As a signed in user, I would like to sign out.</li>
<li>As a signed in user, I would like to create a journal entry.</li>
<li>As a signed in user, I would like to edit a journal entry.</li>
<li>As a signed in user, I would like to delete a journal entry.</li>
<li>As a signed in user, I would like to see all my journal entries.</li>
</ul>

<h4>Wireframes & ERDs</h4>
<img src="public/Wireframes.png">

<h4>Unsolved Problems & Strech Goals</h4>
<p>I hope to make this application more of a social experience, where users can interact with one another through their posts. I intend to make this happen by opening up access and permission to journal entries in the backend. On the client side, I would love to include an ability to add tags to posts, making searchability by keyword a possibility.</p>
