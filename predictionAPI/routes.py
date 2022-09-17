import pickle
import datetime
import pandas as pd
from fastapi import APIRouter, status
# from requestobject import RequestObject
from weather_utils import WeatherData
from fastapi.responses import JSONResponse
from date_utils import get_date_information

router = APIRouter()


@router.get("/", response_class=JSONResponse)
async def heart_beat_check():
    """
    API can be pinged at this endpoint to test for heart beat status
    :return: HTTP 200 code with message {"message": "Hello World"}
    """
    return JSONResponse(
        status_code=status.HTTP_200_OK, content={"message": "Hello World"}
    )


@router.post("/predict", response_class=JSONResponse)
def predict_office_visit(data: dict):
    # data = data.dict()

    weather_data = WeatherData()
    temperature = weather_data.get_avg_temperature()
    precipitation = weather_data.get_rain()
    people = float(data["people"])

    # Compute 'day', 'month' and 'dayofweek'
    datum_day, datum_month, datum_dayofweek = get_date_information()

    df = pd.DataFrame([{
        "precipitation": precipitation,
        "temperature": temperature,
        "people": people,
        "datum_day": datum_day,
        "datum_month": datum_month,
        "datum_dayofweek": datum_dayofweek
    }])

    with open("./../model/co2_estimator.sav", 'rb') as model:
        predictor = pickle.load(model)
        prediction = predictor.predict(df)
        return JSONResponse(
            status_code=status.HTTP_200_OK, content={"prediction": prediction[0][0]}
        )
