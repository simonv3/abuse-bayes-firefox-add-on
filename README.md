# abuse bayes firefox add-on

Filter your twitter feed for abuse using Bayesian filtering.

Relies on an instance of [abuse-bayes-server](https://github.com/simonv3/abuse-bayes-server)

This extension will be published once the server gets hosted!

# Getting Started With Developing

Install `jpm`, Mozilla's npm.
```
npm install -g jpm
```

Then clone the repository:

```
git clone git@github.com/simonv3/abuse-bayes-firefox-add-on
```

cd into the directory:

```
cd abuse-bayes-firefox-add-on
```

Install dependencies for the content scripts:
```
cd data
bower install
```

While developing:

```
jpm watchpost --post-url http://localhost:8888/
```
