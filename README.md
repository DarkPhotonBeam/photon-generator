# [photon-generator](https://github.com/DarkPhotonBeam/photon-generator)
###### v0.0.6

## Newest Features

### Auto-Regen

Let photon-generator automatically regenerate your build on file changes! Just run the command with the --watch flag and photon-generator will poll for changes and regenerate when a change has been made!
```shell
photon-generator --watch
```
or
```shell
photon-generator -w
```

The polling interval in ms can be changed using --pollingRate or -pr (default: 1000ms)
```shell
photon-generator -w -pr 100
```

### Local Web Server

Using --serve you can look at your build in the browser on your local machine.

### New Default Styles

I am rebuilding the default styles from the ground up. Latest version features cleaner margins and layouts, nicer and responsive menu, code highlighting and LaTeX support.

## Installation

Either execute directly using
```shell
npx photon-generator
```
or install using
```shell
npm i -g photon-generator
```
or clone and build yourself.

### How to build:
```shell
npm install && npm run compile
```

Afterwards executable is found at ``build/src/index.js``.

## Usage
### Example Folder structure

- .
- pages/
  - index.html
  - meta.json
  - blog/
    - first-post/
      - first-post.md
      - meta.json
    - second-post/
      - foo.html
    - whatever/
      - idontcare.md
  - about/
    - aboutme.html
    - meta.json
    - style.css
  - assets/
    - portrait.jpg

Each folder represents a route. A folder can have at max one .html or .md file which describes the body of that route.
meta.json is for metadata. All media like pictures should be stored in the assets/ folder. pages/ is your root folder, i.e. "index.html". pages/ cannot be renamed, photon-generator searches for a pages/ directory on execution.

### Example meta.json

```json
{
  "title": "A very cool page",
  "name": "Cool Page",
  "keywords": "cool,very cool,the coolest",
  "description": "The very coolest site."
}
```

Every keyword is optional.
"title" generates to the title of your tab.
"name" describes what a link linking to this page should be called in auto-generated navigation. "keywords" and "description" are for SEO.

## Coming Soon

* Custom Global Styling
* Custom per page styling
* Nav overrides
* Pre-built and custom in-md-components
