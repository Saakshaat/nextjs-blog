Next.js Mind Dump
=

A central space for me to jot my thoughts and ideas. This is also my first [next.js](https://nextjs.org/) application which is being hosted on [Vercel](https://vercel.com/).


Steps to Reproduce
- 
To use this application follow these steps:

##### Setup
You need `npm` to install packages.

- Mac
  - Get homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
`
  - Install node `brew install node`

- Linux
  - `sudo apt-get install curl`
  - `curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -`

After you get `npm`, you need to install the following packages with these commands:
- `npm install -g npx`
- `npm install gray-matter remark remark-html date-fns @emotion/react @emotion/styled @emotion/core`

If starting the server throws a missing dependency error, install that dependency with
`npm install <dependency>`.
  

##### Running

In order to run this app, you need to clone it locally:
- `git clone https://github.com/Saakshaat/nextjs-blog`
- `cd $PATH/nextjs-blog` (replace `$PATH` with the actual path of the repository on your system)
- `npm run dev`

This starts the server locally on `localhost`. 

You can now visit `localhost:port` in your browser to access the application.
