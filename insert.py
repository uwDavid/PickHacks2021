from Google import Create_Service
import pandas as pd

CLIENT_SECRETE_FILE = './keys.json'
API_NAME = 'youtube'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/youtubepartner',
    'https://www.googleapis.com/auth/youtube', 
    'https://www.googleapis.com/auth/youtube.force-ssl']

Create_Service(CLIENT_SECRETE_FILE, API_NAME, API_VERSION, SCOPES)

playlist_id = 'PLtUHWpjOGp66jtDY5-EDW1fv7FS59WUND'

request_body = {
    'snippet': {
        'playlistId': playlist_id,
        'resourceId': {
            'kind': 'youtube#video',
            'videoId': 'M7FIvfx5J10'
        }
    }
}

service.playlistItems().insert(
    part='snippet',
    body=request_body
).execute()

