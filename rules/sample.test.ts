import fs from "node:fs";

import { expect, test } from "@jest/globals";
import {
  compileRuleFn,
  patchFromGitHubPullRequest,
  RuleFnSourceLang,
  RuleLogMode,
  runRule,
} from "@fensak-io/reng";
import type { IGitHubRepository } from "@fensak-io/reng";
import { Octokit } from "@octokit/rest";

const ruleFnSrc = fs.readFileSync(`${__dirname}/sample.ts`, "utf8");
const ruleFn = compileRuleFn(ruleFnSrc, RuleFnSourceLang.Typescript);
const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
});
const testRepo: IGitHubRepository = {
  owner: "fensak-io",
  name: "dotfensak-deno-template",
};
const opts = { logMode: RuleLogMode.Console };

test("No changes should be approved", async () => {
  const result = await runRule(
    ruleFn,
    [],
    { sourceBranch: "foo", targetBranch: "bar" },
    opts,
  );
  expect(result.approve).toBe(true);
});

test("Changes only to README should be approved", async () => {
  // View PR at
  // https://github.com/fensak-io/dotfensak-deno-template/pull/1
  const patches = await patchFromGitHubPullRequest(octokit, testRepo, 1);
  const result = await runRule(
    ruleFn,
    patches.patchList,
    patches.metadata,
    opts,
  );
  expect(result.approve).toBe(true);
});

test("Changes to non-README files should be rejected", async () => {
  // View PR at
  // https://github.com/fensak-io/dotfensak-deno-template/pull/2
  const patches = await patchFromGitHubPullRequest(octokit, testRepo, 2);
  const result = await runRule(
    ruleFn,
    patches.patchList,
    patches.metadata,
    opts,
  );
  expect(result.approve).toBe(false);
});

test("Change containing more than one file should be rejected", async () => {
  // View PR at
  // https://github.com/fensak-io/dotfensak-deno-template/pull/4
  const patches = await patchFromGitHubPullRequest(octokit, testRepo, 4);
  const result = await runRule(
    ruleFn,
    patches.patchList,
    patches.metadata,
    opts,
  );
  expect(result.approve).toBe(false);
});
