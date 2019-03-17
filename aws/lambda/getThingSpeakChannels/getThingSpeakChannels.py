import json
import boto3

def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        tableChannels = dynamodb.Table('Channels')
        response = tableChannels.scan()
    except:
        return {
        'statusCode': 500,
        'body': json.dumps('Error getting channels from ThingSpeak')
        }
    
    return {
        'statusCode': 200,
        'body': response['Items']
    }