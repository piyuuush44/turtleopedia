Turtleopedia main repository
Jump into individual directories for further information on how to run various services and apps.

Pipeline Status

Server Master



Server Dev



Environments
Our system has 5 environments -


test - this is used for unit testing

local - this is used to run all servers and clients locally

dev - this is run in AWS region us-east-1. This environment should be used for ad-hoc testing

staging - this is run in AWS region ap-southeast-1. The purpose of this environment is to maintain an environment as close to production as possible

prod - this is our production environment running in AWS region ap-south-1.


Branching Convention
There are 4 main levels of branching -

staging branch - master.
development branch - dev

feature branches - prefix with feature/

fix branches - prefix with fix/

hotfix branches - prefix with hotfix/.
Other than these, developers are free to create an arbitrary number of personal branches.


master branch

This branch is only to be used for production pushes. It is kept separate from dev so we can perform quick hotfixes if needed without interrupting the dev workflow.
This branch deploys to the staging environment.


dev branch

This is the main development branch. All new features are accumulated in this branch until we are ready to push. Our aim should be to make a production push every 4-5 days.
This branch deploys to the dev environment


feature/ branches

Each new feature should be on a new feature branch cut from the dev branch.
Feature branches should be named after the feature and should be prefixed with feature/ - ex. feature/social_login or feature/agent_app_crm, etc.
A single Trello task will roughly map to a single feature branch.
If two or more developers are working on a feature, individual developer branches can be created by cutting further from feature branches. ex. feature/social_login/paritosh, etc.
PRs should be raised from the feature/ branch to the dev branch. If quicker feedback is required, a PR can be submitted from the individual developer branches to the feature branch. Ex. from feature/abc/developer branch to the feature/abc branch.
Merge from the dev to feature/ branches frequently to avoid costly merge conflicts later on.


fix/ branches

These branches are cut from dev and are to be used to perform fixes and small changes in dev. If the fix is urgent and needs to be deployed to prod, then cut a hotfix/ branch instead (see below).


hotfix/ branches

These branches are cut directly from master and are to be used to perform quick bug fixes without interrupting the dev workflow.
After a hotfix/ branch is merged into master, master should be merged back into dev to ensure the hotfix changes are included in dev.

Note: All feature/, fix/ and hotfix/ branches can be deployed to the dev environment for testing by adding the branch name to the relevant gitlab-ci config files.

Pull Requests

It is encouraged to submit short Pull Requests unless otherwise necessary. This will lead to quicker turnaround and faster development.


Testing

Every new feature, class, component should include unit tests.
Our goal is to be >95% unit test line coverage.