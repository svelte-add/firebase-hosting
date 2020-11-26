<h1 align="center">🔥 Add Firebase Hosting to Svelte</h1>

## ❓ What is this?
This is an **experimental** command to run to add hosting on Firebase to your SvelteKit project.

## 🛠 Usage
You must start with a fresh copy of the official SvelteKit template, which is currently created by running this command.
```sh
npm init svelte@next
# By the way, please listen to its warnings that SvelteKit is an alpha project
# https://svelte.dev/blog/whats-the-deal-with-sveltekit#When_can_I_start_using_it
```

Once that is set up, run this command in your project directory to set up hosting on Firebase:
```sh
npx use-preset babichjacob/svelte-add-firebase-hosting --no-ssh
```

After the preset runs,
* [You *cannot* use server-side rendering](https://github.com/babichjacob/svelte-add-firebase-hosting/issues/1). Your site must be static. This means that, among other things, [`svelte-add-graphql`](https://github.com/babichjacob/svelte-add-graphql) is currently not suitable to be hosted on Firebase.

* Consider setting up GitHub Actions for automatic building and deployment to Firebase.
  
  Start by generating [a CI login token from Firebase](https://firebase.google.com/docs/cli#cli-ci-systems):
  ```sh
  npm run firebase login:ci
  ```
  
  Then, go to your repository's [Settings > Secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository). Copy the result of the command above and [save it as a Secret](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) named `FIREBASE_TOKEN`.

  You can test if it's working by making a commit to `main` or `master` and checking the Actions tab of your repository to see if your project successfully builds and deploys to Firebase.

* You can create a custom 404 page at `src/routes/404.svelte`.

* You can use the `deploy` package script to manually deploy the site after a `build`.

## 😵 Help! I have a question
[Create an issue](https://github.com/babichjacob/svelte-add-firebase-hosting/issues/new) and I'll try to help.

## 😡 Fix! There is something that needs improvement
[Create an issue](https://github.com/babichjacob/svelte-add-firebase-hosting/issues/new) or [pull request](https://github.com/babichjacob/svelte-add-firebase-hosting/pulls) and I'll try to fix.

These are new tools, so there are likely to be problems in this project. Thank you for bringing them to my attention or fixing them for me.

## 📄 License
MIT

---

*Repository preview image generated with [GitHub Social Preview](https://social-preview.pqt.dev/)*

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
