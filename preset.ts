import { Preset } from "apply";

Preset.setName("svelte-add/firebase-hosting");

Preset.group((preset) => {
	preset.input("project", "What is your Firebase project's ID, according to https://console.firebase.google.com/ ?", "my-project-123");
	
	preset.extract("firebase.json").withTitle("Setting up Firebase hosting rules");
	
	preset.extract(".firebaserc").withTitle(({ prompts }) => `Assigning \`${prompts.project}\` as the Firebase project`);
	preset.edit(".firebaserc").update((_content, { prompts }) => {
		return JSON.stringify({
			"projects": {
				"default": prompts.project,
			},
		}, null, "\t");
	});
}).withTitle("Initializing Firebase");

Preset.group((preset) => {
	preset.editNodePackages().addDev("firebase-tools", "^9.5.0").withTitle("Installing Firebase CLI");
	preset.editNodePackages().addDev("ncp", "^2.0.0").withTitle("Installing `ncp`");
	preset.editNodePackages().addDev("npm-run-all", "^4.1.5").withTitle("Installing `npm-run-all`");
	preset.editNodePackages().addDev("rimraf", "^3.0.2").withTitle("Installing `rimraf`");
}).withTitle("Installing packages");

Preset.extract("src/routes/404.svelte").withTitle("Adding custom 404 error page");

Preset.group((preset) => {
	preset.editJson("package.json").merge({
		"scripts": {
			"firebase": "firebase",
		},
	}).withTitle("Adding `firebase` package script for easy access to the Firebase CLI");

	preset.editJson("package.json").merge({
		"scripts": {
			"cp:404": "ncp build/404/index.html build/404.html",
			"rm:404": "rimraf - build/404",
		},
	}).withTitle("Adding package scripts for putting the 404 page in the correct place after build");

	preset.edit("package.json").update((content) => {
		const pkg = JSON.parse(content);

		// Preserve old adapt script instead of heavy-handedly replacing it
		const adapt = pkg.scripts.adapt;
		pkg.scripts["svelte-kit:adapt"] = adapt || "svelte-kit adapt";

		pkg.scripts["adapt"] = "run-s svelte-kit:adapt cp:404 rm:404";

		return JSON.stringify(pkg, null, "\t");
	}).withTitle("Updating `adapt` package script to make use of the 404 scripts");

	preset.editJson("package.json").merge({
		"scripts": {
			"deploy": "firebase deploy",
		},
	}).withTitle("Adding `deploy` package script");
}).withTitle("Adding package scripts");

Preset.group((preset) => {
	preset.editNodePackages().addDev("@sveltejs/adapter-static", "1.0.0-next.2").withTitle("Installing `@sveltejs/adapter-static`");
	preset.edit("svelte.config.js").update((content) => {
		const matchAdapter = /adapter:[\s\r\n]['"](.+)['"]/;
		return content.replace(matchAdapter, (_match, _currentAdapter) => 'adapter: "@sveltejs/adapter-static"');
	}).withTitle("Setting the adapter to `@sveltejs/adapter-static` in `svelte.config.js`");
}).withTitle("Making your site static");

Preset.extract(".github/workflows/build-and-deploy.yml").withTitle("Adding GitHub Actions workflow for deployment");

Preset.installDependencies().ifUserApproves();
