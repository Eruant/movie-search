Task
====

Build a UI to search the Movie DB: The user should be able to enter some text into a search field, see and browse the results from the Movie DB.

Setup
-----

You will need `node 6` or `docker` installed.

In development you can set up a `local.env` file using the `local.env.template` as a guide. You will need to add your own API key for `themoviedb`.

```bash
# start a node 6 container (skip this if you are running node directly)
docker run -i -v $(pwd):/app -w '/app' -p 8080:8080 -t node:6 bash

# install modules
npm install

# build the client code
npm run build

# start the dev server
npm run dev
```

Next steps
----------

- [ ] a filters to results
- [ ] add pagination controls
