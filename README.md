# Northcoders News API
As part of *Northcoder's Skills Bootcamp in Software Development*, we were tasked with building a C.R.U.D. application frontend which uses information from my other [backend project](https://github.com/M1nhnho/be-nc-news). This app allows clients to view articles, grouped under topics, along with comments and the users behind them - akin to Reddit or similar news services.

This frontend project was built in HTML, CSS, and Javascript using [React](https://react.dev/) to enable easier management by splitting parts into reusable components that can be conditionally rendered. Additionally, error handling has been implemented and various in-built hooks have been used along with my custom hook to detect window size. Moreover, [Axios](https://axios-http.com/) was used to access my backend API. Responsiveness was also kept in consideration and [WAVE](https://wave.webaim.org/) was used for accessibility to conform to WCAG 2.2 at Level AA.

## Hosted version
My frontend project can be found here:  
https://minhnho-nc-news.netlify.app/

Hosted via [Netlify](https://www.netlify.com/).

### Navigation
```md
<Header>
- Clickable title
  -> Navigates to <Home>

- Navigation bar of clickable topics
  -> Navigates to <Articles> of the clicked topic

#-------------------------

<Home>
- <Header>

- List of clickable topics
  -> Navigates to <Articles> of the clicked topic

#-------------------------

<Articles>
- <Header>

- Sort by
  - Arrow button
    -> Swaps between ascending and descending order
  - Dropdown
    -> Selects option to sort the articles by

- List of clickable articles of the relevant topic
  -> Navigates to <Full Article> of the clicked article
  - Vote buttons
    -> Upvotes/downvotes article

- Navigation bar of clickable page numbers
  -> Displays the clicked page of articles

#-------------------------

<Full Article>
- <Header>

- Full article with more details
  - Vote buttons
    -> Upvotes/downvotes article

- Post comment
  - Input box
  - Comment button
    -> Posts comment (only if comment is not empty)

- List of comments on the current article
  - Vote buttons
    -> Upvotes/downvotes article
  - Delete button (only appears if it's your comment)
    -> Deletes comment

- Navigation bar of clickable page numbers
  -> Displays the clicked page of comments

#-------------------------

<Error> (appears on non-existent path)
- <Header>

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