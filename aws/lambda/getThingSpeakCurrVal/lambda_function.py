import json
import urllib.request
from datetime import datetime
import pytz
import math
import boto3


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    tableMessages = dynamodb.Table('Messages')

    try:
        url = event['endPoint']
        response = urllib.request.urlopen(url)
        data = json.loads(response.read().decode(response.info().get_param('charset') or 'utf-8'))

        date = datetime.strptime(data['feeds'][0]['created_at'], "%Y-%m-%dT%H:%M:%SZ")
        local = pytz.timezone('America/Sao_Paulo')

        localDateTmz = date.astimezone(local)

        # Used to correct timestamp out of AWS Lambda
        #localDate = localDateTmz + localDateTmz.utcoffset()
        #data['feeds'][0]['created_at'] = localDate.strftime("%Y-%m-%d %H:%M:%S")

        data['feeds'][0]['created_at'] = localDateTmz.strftime("%Y-%m-%d %H:%M:%S")

        temperature = float(data['feeds'][0]['field1'])
        moisure = float(data['feeds'][0]['field2'])
        airQuality = float(data['feeds'][0]['field3'])

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(e.message)
        }

    try:
        if moisure > 100:
            moisure = 100

        temperature = ((temperature * 1.8) + 32)

        thermalConfort = (0.5 * ((temperature + 61 + ((temperature - 68) * 1.2) + (moisure * 0.094))));

        if (thermalConfort >= 80):
            HI = (-42.379 + (2.04901523 * temperature) + (10.14333127 * moisure) -
                  (0.22475541 * temperature * moisure) -
                  (0.00683783 * temperature * temperature) -
                  (0.05481717 * moisure * moisure) +
                  (0.00122874 * temperature * temperature * moisure) +
                  (0.00085282 * temperature * moisure * moisure) -
                  (0.00000199 * temperature * temperature * moisure * moisure));
            offset = 0;
            thermalConfort = HI;
            if ((moisure < 13) and (temperature >= 80 and temperature <= 112)):
                offset = ((13 - moisure) / 4) * math.sqrt((17 - abs(temperature - 95.)) / 17);
                thermalConfort = HI - AJUSTE;
            if ((moisure > 85) and (temperature >= 80 and temperature <= 87)):
                offset = ((moisure - 85) / 10) * ((87 - temperature) / 5);
                thermalConfort = HI + offset;

        thermalConfort = ((thermalConfort - 32) / 1.8);
        data['feeds'][0]['thermalConfort'] = thermalConfort


    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(e.message)
        }

    try:
        messageResponse = tableMessages.scan()
        thermalConfortMessage = [x for x in messageResponse['Items'] if
                                 x['bot'] <= thermalConfort and x['top'] > thermalConfort and x[
                                     'topic'] == 'thermalConfort']
        relativeHumityMessage = [x for x in messageResponse['Items'] if
                                 x['bot'] <= moisure and x['top'] > moisure and x['topic'] == 'relativeHumity']
        airQualityMessage = [x for x in messageResponse['Items'] if
                             x['bot'] <= airQuality and x['top'] > airQuality and x['topic'] == 'airQuality']

        data['feeds'][0]['thermalConfortMessage'] = thermalConfortMessage
        data['feeds'][0]['relativeHumityMessage'] = relativeHumityMessage
        data['feeds'][0]['airQualityMessage'] = airQualityMessage

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(e.message)
        }

    return {
        'statusCode': 200,
        'body': data['feeds']
    }
