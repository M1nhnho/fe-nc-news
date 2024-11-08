# Northcoders News API <img alt="Static Badge" src="https://img.shields.io/badge/Node.js-v20.11.0-green?link=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload"> <img alt="Static Badge" src="https://img.shields.io/badge/React-v18.2.0-blue">

As part of *Northcoder's Skills Bootcamp in Software Development*, we were tasked with building a C.R.U.D. news application frontend which uses information from my other [backend project](https://github.com/M1nhnho/be-nc-news). This app allows clients to view articles, grouped under topics, along with comments and the users behind them - akin to Reddit or similar news services.

This frontend project was built in HTML, CSS, and JavaScript using [React](https://react.dev/) to enable easier management by splitting parts into reusable components that can be conditionally rendered. Error handling has been implemented and various in-built hooks have been used along with my own custom hooks. Responsiveness was also kept in consideration and [WAVE](https://wave.webaim.org/) was used for accessibility to conform to WCAG 2.2 at Level AA. Moreover, [Axios](https://axios-http.com/) was used to access my backend API.

## Hosted version
My frontend project can be viewed at  
➤ https://minhnho-nc-news.netlify.app/

Hosted via [Netlify](https://www.netlify.com/).

### Navigation
```md
<Header> (always appears at the top)
│
├── Clickable title
│   └─> Click to go to <Home>
│
├── User bar
│   └── Log in/out button
│       └─> Click to log in as tickle122 / log out
│
└── Navigation bar of clickable topics
    └─> Click to go to <Articles> of the clicked topic

<Home>
│
├── Latest article
│   └─> Click to go to relevant <Full Article>
│
├── List of clickable topics
│   └─> Click to go to relevant <Articles>
│
└── Statistics of how many articles, topics, and users there are

<Articles>
│
├── Sort by
│   ├── Arrow button
│   │   └─> Click to swap between ascending and descending order
│   └── Dropdown
│       └─> Click to select an option to sort the articles by
│
└── List of clickable articles of the relevant topic
    ├─> Click to go to relevant <Full Article>
    ├── Vote buttons
    │   └─> Click to upvote/downvote relevant article
    ├─> Scroll to bottom to load more articles if possible
    └── Back to top button
        └─> Click to scroll back up to the top of the page

<Full Article>
│
├── Full article with more details
│   └── Vote buttons
│       └─> Click to upvote/downvote relevant article
│
├── Post comment (only appears if logged in)
│   ├── Input box
│   └── Comment button
│       └─> Click to post comment (only if comment is not empty)
│
└── List of comments on the current article
    ├── Vote buttons
    │   └─> Click to upvote/downvote relevant comment
    ├── Delete button (only appears if logged in and comment belongs to tickle122)
    │   └─> Click to delete relevant comment
    ├─> Scroll to bottom to load more comments if possible
    └── Back to top button
        └─> Click to scroll back up to the top of the page

<Error> (appears on non-existent path)
│
├── Error message
│
└── Home button
    └─> Click to go to <Home>

```

## Local setup
If you wish to run this front project locally, ensure you fulfill the requirements below before following the instructions.

### Minimum Requirements
- [Node.js](https://nodejs.org/en/download) (v20.11.0)

### Instructions
1. Navigate to the directory you wish to download the repository to
2. Run the following commands inside the terminal:
    ```
    git clone https://github.com/M1nhnho/fe-nc-news.git
    ```
3. Navigate into the newly created `fe-nc-news` directory
4. Run the following command to install all the needed dependencies:
    ```
    npm install
    ```
5. Run the following command to view the app locally:
    ```
    npm run dev
    ```
6. If everything works as expected, you are free to play around as you wish 🎉
