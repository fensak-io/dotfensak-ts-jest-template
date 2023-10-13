# Deno template for .fensak repositories

Use this template to create a JavaScript and [Jest](https://jestjs.io/) based `.fensak` repository in your Organization
with a recommended project configuration for writing and testing rules. Feel free to clone this repo and make any
modifications necessary to get up and running with Fensak.

Check out our [Getting started guide](https://docs.fensak.io/docs/getting-started/).

## What's included

This template includes the following:

### Sample rule

A sample rule file (using JavaScript) is provided in the [rules folder](/rules). The sample rule is a basic "Hello
world" example that allows any PRs that only contains updates to the `README.md` file in the root of the repository. It
should give you a basic starting point for navigating the patch object provided to rules functions by Fensak.

For more example rules, checkout
[fensak-io/fensak-rules-examples](https://github.com/fensak-io/fensak-rules-examples).

Also check out our [Writing rules scripts guide](https://docs.fensak.io/docs/writing-rules/).

### Sample config

A sample [fensak.yml](/fensak.yml) config file is provided for your convenience. The config file maps a single fictional
repository in your Organization (`my-repo`) against the sample rule, [rules/sample.js](/rules/sample.js).

Check out our [Config file reference](https://docs.fensak.io/docs/config-reference/) for an overview of the Fensak
config file.

### Tests

This template includes a project scaffold for running tests for the rules using [Jest](https://jestjs.io/). The tests
contain example usage of the Fensak module for testing various pull requests against the rules. See
[rules/sample.test.js](/rules/sample.test.js) for more details.

To run the test, follow these steps:

1. Install [Node](https://nodejs.org/en) if you do not have it already.
1. Install [pnpm](https://pnpm.io/) if you do not have it already.
1. Install dependencies by running `pnpm install`.
1. Run `pnpm test` with modules support (set the environment variable `NODE_OPTIONS=--experimental-vm-modules`). See
   https://jestjs.io/docs/ecmascript-modules for more information on why the `NODE_OPTIONS` env var is necessary.

> **NOTE**
>
> The tests make API calls to GitHub. If you start hitting rate limits, try setting a personal access token on the
> environment variable `GITHUB_API_TOKEN`.

### CI/CD with GitHub Actions

This template also includes a sample CI/CD workflow based on GitHub Actions in the [.github/workflows
folder](/.github/workflows). The GitHub Actions workflow will:

- Check if the code is linted and formatted properly using `prettier` and `eslint`.
- Run the tests using `pnpm test` and output a junit report.
- Process the junit report and upload to GitHub Actions so that it can be viewed.

## Instructions

1. Create a new repo against this template on GitHub. Refer to [the official
   documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
   for more details on using template repositories.
1. Wait for the `bootstrap` [GitHub Actions](https://docs.github.com/en/actions) job to run. Remove the following files
   if you have GitHub Actions disabled on new repos in your Org:

   1. `LICENSE`
   1. `SECURITY.md`
   1. `.github/workflows/bootstrap.yml`

1. Add and define your own rules in the [rules folder](/rules).
1. Update this README to suit your needs.

## Questions or Feedback

If you have any questions, concerns, or feedback pertaining to this repository or Fensak in general, please start a
discussion on the [Fensak GitHub Discussions forum](https://github.com/orgs/fensak-io/discussions).
