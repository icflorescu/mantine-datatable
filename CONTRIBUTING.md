# Contributing

If you find a bug, please feel free to [raise an issue](https://github.com/icflorescu/mantine-datatable/issues).  
If you have an idea about a new or missing feature, let's discuss it [here](https://github.com/icflorescu/mantine-datatable/discussions).

Better yet, if you're willing to put your effort into it, coming up with a pull-request would be fantastic.  
So many people _take open-source for granted_, but far fewer understand its true essence and are generous enough to contribute their own time and skills to a project they find useful.  
If you're here though, you're probably one of the fewer ones.

## Things to keep in mind

The repository is holding the code for both Mantine DataTable package and its documentation website.  
Since the repo root contains a `yarn.lock` file, it **should be obvious** that you have to use [Yarn](https://yarnpkg.com/) to install dependencies and run scripts.  
Use `yarn dev` to start the development server, `yarn lint` to check the code for linting errors, and `yarn build` to check that the code compiles.  
Running `yarn format` will automatically format your code with [Prettier](https://prettier.io/), so that it adheres to the project’s coding style.  
This is a [Next.js](https://nextjs.org/) project with an [app router](https://nextjs.org/docs/app/building-your-application/routing) and makes use of [React Server Components]().  
**Make sure you have a good grasp of the above before attempting to contribute.**

The Mantine DataTable package code is located in the `package` folder, while the documentation website code is located in the `app` folder.  
The `components` folder holds generic React components used by the documentation website.  
If you want to implement a new feature or improve an existing one, make sure to add an example page and/or alter the one(s) already referring to it.  
It’s not a feature if other people don’t know about it or don’t understand how to use it.

**Please target your PRs to the `next` branch.**
Pushing to the `main` branch triggers the GitHub deployment workflow, so PRs targeting `main` will be rejected.

## Code contributors

Here's a list of all the people who have contributed to the codebase of this project so far:

[![Contributors list](https://contrib.rocks/image?repo=icflorescu/mantine-datatable)](https://github.com/icflorescu/mantine-datatable/graphs/contributors)
