<p align="center">
  <img src="./graphics/small-logo.svg" width="400" height="300" class="center">
  <img src="./graphics/hackzurich_logo.png" width="400" height="300" class="center">
</p>

<br>

<h1 align="center"> Remote Forecaster</h1>

<h3 align="center"> Powered by PASS </h3>

<br>

# Motivation
In a world beyond the verge of the change, where more and more people are starting working from all around, we need
to be aware of the impact of such a choice. Not only on our social sphere, but also on 
the environment and our own health. Why do we need to know that? Because only through conscious decisions
one can shape their behaviour and change their lives, their society and, ultimately, the environment. For the better.

Remote Forecaster helps you to understand the impact of going to the office or not, depending on your habits, 
meteorological situation and office air quality conditions. Improve your decisions, by being aware of what they are producing.

# Architecture

<p align="center">
  <img src="./graphics/hackzurich_architecture.png" class="center">
</p>

## Model Development
The model is giving you a percentage of how likely you should go to the office depending on the social interaction possibility.
Percentage is computed from the backend from the model's prediction: the level of CO2 inside the office, 
based on the outside weather situation and the inside air quality conditions.
The features taken into account come from the following data sources:
- [Democratize Air Quality - Sensirion](https://sensirion.com/career/career-news/hack-zurich/)
- [Stündlich aktualisierte Meteodaten - Open Data Swiss](https://opendata.swiss/en/dataset/stundlich-aktualisierte-meteodaten-seit-1992)


## The tech behind it all
### Backend
- We wanted to use all the datasets available to us, but because of limitation of time, we had to narrow the scope to identify what we want to achieve and how we can optimally do it
- We used the power of Machine learning to make valuable predictions from air quality, climate and energy datasets to conserve resources.
- We realised that only one dataset on its own is not enough to enable us to make valuable predictions. We had to combine multiple open datasets, as well as gather real time weather results in order to achieve meaningful predictions.
- We gather data from [Sensirion](https://sensirion.com/career/career-news/hack-zurich/), [opendata.swiss](https://opendata.swiss/) and [OpenWeatherApi](https://openweathermap.org/current) to feed our Machine Learning algorithm, and identify how to make an optimised decision in a constrained environment.



### Frontend