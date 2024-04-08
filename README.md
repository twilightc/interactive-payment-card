
# Interactive payment card

### [Demo](https://twilightc.github.io/interactive-payment-card/ 'demo')

Mainly inspired from [Here](https://github.com/muhammed/interactive-card 'vue-interactive-card')


## Features

- React 18
- Tailwind
- React-transition-group
- Jotai
- Github Action
- Husky/Lint-staged

Here we use react-transition-group to simulate card number animation, using Jotai to manage shared data, including
  - card information
  - focus box current target
  - focus box css

When commiting any change to local, husky will trigger lint-staged to check and format modified files in this change.

Finally, after pushing changes to github, github action will automaticlly deploy page to gh-pages branch.

## Getting started

After clone to your repository, run:

```bash
npm install
```

Then use

```bash
npm run dev
```

to check result.