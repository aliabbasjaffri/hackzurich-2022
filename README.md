<p align="center">
  <img src="./graphics/small-logo.svg" width="400" height="300" class="center">
<img src="./graphics/hackzurich_logo.png" width="400" height="300" class="center">
</p>

<br>

<h1 align="center"> Remote Forecaster</h1>

<h3 align="center"> Powered by PASS </h3>

<br>

# Introduction
Repository containing code to deploy the Remote Forecaster: a mobile app what show you why you should go to the office today!

# Motivation
In a world beyond the verge of the change, where more and more people are starting working from all around, we need
to be aware of the impact of such a choice. Not only on our social sphere, but also on 
the environment and our own health. Why do we need to know that? Because only through conscious decisions
one can shape their behaviour and change their lives, their society and, ultimately, the environment. For the better.

Remote Forecaster helps you to understand the impact of going to the office or not, depending on your habits, 
meteorological situation and office air quality conditions. Improve your decisions, by being aware of what they are producing.

# Architecture

## Model Development
The model is giving you a percentage of how likely you should go to the office depending on the social interaction possibility.
Percentage is computed from the backend from the model's prediction: the level of CO2 inside the office, 
based on the outside weather situation and the inside air quality conditions.
The features taken into account come from the following data sources:
- [Democratize Air Quality - Sensirion](https://sensirion.com/career/career-news/hack-zurich/)
- [Stündlich aktualisierte Meteodaten - Open Data Swiss](https://opendata.swiss/en/dataset/stundlich-aktualisierte-meteodaten-seit-1992)
