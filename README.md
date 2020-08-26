**Turtleopedia main repository**
Jump into individual directories for further information on how to run various services and apps.

Pipeline Status

Server Master

Server Dev


Environments
Our system has 3 environments -


test - this is used for unit testing

local - this is used to run all servers and clients locally

prod - this is our production environment running in Google cloud region ap-southeast-1.


Branching Convention
There are 4 main levels of branching -

staging branch - master.
development branch - dev

feature branches - prefix with feature/

fix branches - prefix with fix/

hotfix branches - prefix with hotfix/.
Other than these, we are free to create an arbitrary number of personal branches.

master branch

This branch is only to be used for production pushes. It is kept separate from dev so we can perform quick hotfixes if needed without interrupting the dev workflow.
