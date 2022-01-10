# MVST GitHub

This is a submission for the MVST code test. The request was to *"display the repositories and allow the user to filter through the repositories by name using a search bar"*. 

Giving the user the ability to choose whose repositories they had access to was not part of the request, however, I have also provided this feature. The site defaults to my own profile but using the user search allows other profiles to be displayed.

Most of the code can be found in the App class, where I have lifted most of the state to. This allowed me to keep each of the components decoupled which made testing easier.

A deployed version of this site can be found at [GitHüb](https://githube.netlify.app/).

***
## How it works
Whenever a user is searched for either during `componentDidMount` or via the search input, a call to the GitHub GraphQL API is made. The call itself is simple enough, with it selecting a few details about the user and a few details of the 100 most recent repositories.

The user details are split up during the `setState` call with the `Repositories` class handling all of the work for the repository results. Specifically, the `Repositories` class handles the important work of displaying the repositories and filtering through them.

The `generateDisplay` function is a fairly standard `map` on the repositories passed as props to the class. For most of the fields there is a check for `null` to allow some default text to be displayed. There is also a little bit of inline styling applied to `null` fields. I found an interesting edge case wherein GitHub does not assign a language to a repository due to the repository being empty, simply a Readme, or even where it contains unsupported file extensions. In these cases I supply a generic *"Uncertain language"* message and assign a grey color. This function is called on update or during repository searches when either enough characters have been entered into the input box or the input box is cleared.

The `searchRepos` functions is used to filter through the user's repositories. For the purposes of this exercise, I chose to loop through the repositories array that was passed to the class as a prop. It then checks the `indexOf` the `repoSearch` value against each of the repository name fields. With GitHub limiting the number of results of any given call to 100, this seemed like the sensible way to do this [^1].

[^1]: Of course, I could have [paginated](https://graphql.org/learn/pagination/) the original call and ended up with a number far greater than this, however, this felt out of scope for this exercise.

***
## To Deploy

To deploy the project first clone the repository from the terminal:

```bash
git clone git@github.com:SkinnyPigeon/mvst-challenge.git
```

Now you can change into the `mvst-challenge` directory:

```bash
cd mvst-challenge
```

A new .env file must be created in order to provide the access key:

```bash
echo REACT_APP_TOKEN= >> .env
```

A GitHub personal access token **must be copied to this file after the `=` sign**. These can be created [here](https://github.com/settings/tokens/new). Leaving all of the options blank on the creation screen will work for this project.

Now you must install the **node modules**:

```bash
npm i
```

Once the installation is complete you can start the project with:

```bash
npm start
```

Now you can navigate to http://localhost:3000 to view the working site.

***
## To Run the Test Suite

To run the tests first cd into the `mvst-challenge` directory within your terminal:

```bash
cd mvst-challenge
```

Now you can run the tests:

```bash
npm test
```

If prompted you can select the option to run all tests by pressing:

```bash
a
```

***
## Future improvements
I had originally wanted to include a tooltip on hover over the repositories. This would have contained additional details such as most recent commit message or similar.

I would also like to give the pagination a go using the GraphQL API. I have done it with their non-graph API and would love to see a side-by-side comparison of the speed.

Stylistically it is also a little bare. I wanted to create a pastiche of the actual GitHub site, however, I there is definitely room for some more flare.

***
## Feedback
I quite enjoyed this to be honest. I liked that you had a fairly narrow scope so that it did not take a full-time week's worth of work. There is always a chance that I've missed the point entirely and have drastically underestimated what it is you were hoping for though 😄.