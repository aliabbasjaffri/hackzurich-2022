import pickle
import datetime
import pandas as pd
from fastapi import APIRouter, status
# from requestobject import RequestObject
from fastapi.responses import JSONResponse

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

    temperature = float(data["temperature"])
    precipitation = float(data["precipitation"])
    people = float(data["people"])

    # Compute 'day', 'month' and 'dayofweek'
    datum = datetime.datetime.now()
    datum_day = datum.day
    datum_month = datum.month
    datum_dayofweek = datum.today().weekday()

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