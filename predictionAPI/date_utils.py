import datetime


def get_date_information():
    # Compute 'day', 'month' and 'dayofweek'
    datum = datetime.datetime.now()
    datum_day = datum.day
    datum_month = datum.month
    datum_dayofweek = datum.today().weekday()
    return datum_day, datum_month, datum_dayofweek
