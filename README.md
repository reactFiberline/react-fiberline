# react-fiberline
React Fiberline is a visualizer to help illustrate the inner workings of the new React Fiber Architecture.

### Usage
Fiber is *intense*, it is complicated and has a lot of nuance to it.  Fiberline is a great way to start understanding how things are now working under the hood.

## Getting Started
### Step 1
Install the Fiberline Chrome extension -- [found here](www.google.com)

### Step 2 Option 1: Use the pre-built Demo
Since Facebook hasn't exposed a lot of Fiber's inner workings yet, there is a considerable amount of setup involved.  If you would like to skip the setup and see how Fiberline works with the now famous [movie demo](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html), take a loooong sloooow drink from your water bottle and follow these steps:

1. [Clone this repo](https://github.com/reactFiberline/movie-demo)
2. `cd movie-demo`
3. `npm start` (don't run npm install, everything is pre-built!)

The page will run on `localhost:3000`, as long as you installed the extension from Step 1 you can now use the React Fiberline Devtool from the inspector.

#### Get a deeper look

By opening your browser console and logging `__REACT_FIBERLINE_GLOBAL_HOOK__.fiberlineEvents`, you can see much more detailed information about the processes inside React Fiber.

### Step 2 Option 2: Use your own content!

Coming soon...

## Using Fiberline

#### Notes on future versions
Until Facebook releases an API for Fiber, most of the data Fiberline uses is not exposed.  Once that changes, we plan on a major version release with a much easier setup and more features.  If there is a feature or metric you would like to see added, please add it on the issues page or contribute to an existing conversation about it.

#### Thanks to
-- The Facebook team for React and Andrew Clark for the Movie Demo -> https://codesandbox.io/s/5zk7x551vk
