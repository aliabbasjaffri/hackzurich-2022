import requests
from PIL import Image
from io import BytesIO
import pandas as pd


class PeopleData:

    def __init__(self,
                 data_path: str = './../data/20220915_HackZurich_Sensirion_v1.csv'):

        # Read data
        self.data = pd.read_csv(data_path,
                                parse_dates=['Unnamed: 0'])

        # Rename column
        self.data.rename(columns={'Unnamed: 0': 'datum',
                                  'consumed_meals': 'people'},
                         inplace=True)

        # Compute datetime information
        self.data['datum_month'] = self.data['datum'].dt.month
        self.data['datum_dayofweek'] = self.data['datum'].dt.dayofweek

    def get_average_people(self,
                           dayofweek: int,
                           month: int):

        """
        Return the average of the people in the office for the last month over the passed day of the week

        Parameters:
            dayofweek: Integer day of the week (e.g., Monday = 0)
            month: Integer current month

        Return:
            average_people: Integer average number of people over the last month for the specified day of the week
        """

        # Filter data by month
        data_month_filtered = self.data[self.data['datum_month'] == month - 1]

        # Filter data by week of day
        data_dayof_week_filtered = data_month_filtered[data_month_filtered['datum_dayofweek'] == dayofweek]

        # Compute average people
        average_people = (data_dayof_week_filtered['people'].sum()/len(data_dayof_week_filtered))

        return average_people


class WeatherData:
    def __init__(self, city_id: int = 2657896):
        units = "metric"
        api_key = "835cff48417eef0a0d27d4d61f374d1c"
        URL = f"https://api.openweathermap.org/data/2.5/weather?id={city_id}&units={units}&appid={api_key}"
        r = requests.get(URL)
        self.weather_data = r.json()
        # print(self.weather_data)

    def get_avg_temperature(self):
        return float(self.weather_data["main"]["temp_min"]) + float(self.weather_data["main"]["temp_max"]) / 2

    def get_cloud_percentage(self):
        return self.weather_data["clouds"]["all"]

    def display_weather_icon(self):
        image_url = self.get_weather_icon_url()
        response = requests.get(image_url)
        Image.open(BytesIO(response.content)).show()

    def get_weather_icon_url(self):
        return f'https://openweathermap.org/img/w/{self.weather_data["weather"][0]["icon"]}.png'

    def get_rain(self):
        rain = self.weather_data.get("rain", 0)
        return self.weather_data.get["rain"]["1h"] if rain != 0 else 0


if __name__ == '__main__':
    weatherData = WeatherData()
    print(weatherData.get_avg_temperature())
    print(weatherData.get_cloud_percentage())
    print(weatherData.get_weather_icon_url())
    print(weatherData.get_rain())
