# Northcoders News API
As part of *Northcoder's Skills Bootcamp in Software Development*, we were tasked with building a C.R.U.D. news application frontend which uses information from my other [backend project](https://github.com/M1nhnho/be-nc-news). This app allows clients to view articles, grouped under topics, along with comments and the users behind them - akin to Reddit or similar news services.

This frontend project was built in HTML, CSS, and JavaScript using [React](https://react.dev/) to enable easier management by splitting parts into reusable components that can be conditionally rendered. Error handling has been implemented and various in-built hooks have been used along with my own custom hooks. Responsiveness was also kept in consideration and [WAVE](https://wave.webaim.org/) was used for accessibility to conform to WCAG 2.2 at Level AA. Moreover, [Axios](https://axios-http.com/) was used to access my backend API.

## Hosted version
My frontend project can be found here:  
https://minhnho-nc-news.netlify.app/

Hosted via [Netlify](https://www.netlify.com/).

### Navigation
```md
<Header> (always appears at the top)
- Clickable title
  -> Navigates to <Home>

- User bar
  - Log in/out button
    -> Logs in as tickle122 / Logs out

- Navigation bar of clickable topics
  -> Navigates to <Articles> of the clicked topic

#-------------------------

<Home>
- Latest article
  -> Navigates to <Full Article> of the latest article

- List of clickable topics
  -> Navigates to <Articles> of the clicked topic

- Statistics of how many articles, topics, and users there are

#-------------------------

<Articles>
- Sort by
  - Arrow button
    -> Swaps between ascending and descending order
  - Dropdown
    -> Selects option to sort the articles by

- List of clickable articles of the relevant topic
  -> Navigates to <Full Article> of the clicked article
  - Vote buttons
    -> Upvotes/downvotes article
  -> Scrolling to bottom loads more articles if possible
  - Back to top button
    -> Scrolls up to the top of the page

#-------------------------

<Full Article>
- Full article with more details
  - Vote buttons
    -> Upvotes/downvotes article

- Post comment (only appears if logged in)
  - Input box
  - Comment button
    -> Posts comment (only if comment is not empty)

- List of comments on the current article
  - Vote buttons
    -> Upvotes/downvotes article
  - Delete button (only appears if logged in and comment belongs to tickle122)
    -> Deletes comment
  -> Scrolling to bottom loads more comments if possible
  - Back to top button
    -> Scrolls up to the top of the page

#-------------------------

<Error> (appears on non-existent path)
- Error message

- Home button
  -> Navigates to <Home>

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