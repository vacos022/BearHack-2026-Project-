import requests
import math
from datetime import datetime
from zoneinfo import ZoneInfo
from dotenv import load_dotenv
import os
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
load_dotenv("keys.env")
API_KEY = os.getenv("API_KEY")

url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

LOCAL_TZ = ZoneInfo("America/Los_Angeles")

keyword = input("Care Type: ")

user_lat = 34.1381407763556
user_lng = -117.56053967256484

params = {
    "location": f"{user_lat},{user_lng}",
    "radius": 10000,
    "keyword": keyword,
    "key": API_KEY
}

# GOOGLE SHEETS AUTH
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

creds = Credentials.from_service_account_file(
    "credentials.json",
    scopes=SCOPES
)

service = build("sheets", "v4", credentials=creds)

# ---------------------------------------------------
# SHEET DATABASE LOADER
# ---------------------------------------------------



# ---------------------------------------------------
# LOCATION CLASS
# ---------------------------------------------------

class Location:

    def __init__(self, place_name, distance_m, hours=None):

        self.place_name = place_name
        self.distance_m = distance_m
        self.hours = hours








# ---------------------------------------------------
# GOOGLE MAPS REQUEST
# ---------------------------------------------------

response = requests.get(url, params=params)
data = response.json()

R = 6371.0
locations = [] # USE THIS ARRAY VICTOR

for place in data.get("results", []):

    place_lat = place["geometry"]["location"]["lat"]
    place_lng = place["geometry"]["location"]["lng"]

    key = (round(place_lat,6), round(place_lng,6), keyword.lower())

 

    dlat = math.radians(place_lat - user_lat)
    dlon = math.radians(place_lng - user_lng)

    a = (math.sin(dlat/2)**2 +
         math.cos(math.radians(user_lat)) *
         math.cos(math.radians(place_lat)) *
         math.sin(dlon/2)**2)

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance_m = (R * c) / 1.609

    loc = Location(
        place_name = place["name"], 
        distance_m = distance_m,
        hours = place.get("opening_hours", {}).get("weekday_text", None)  # None if not available
    )

    loc.lat = place_lat
    loc.lng = place_lng

    
        # ---------------------------------------------------
        # POPULATE LOCATIONS LIST
        # ---------------------------------------------------
    locations = []
    for place in data.get("results", []):
        place_lat = place["geometry"]["location"]["lat"]
        place_lng = place["geometry"]["location"]["lng"]

    # compute distance
        dlat = math.radians(place_lat - user_lat)
        dlon = math.radians(place_lng - user_lng)

        a = (math.sin(dlat/2)**2 +
            math.cos(math.radians(user_lat)) *
            math.cos(math.radians(place_lat)) *
            math.sin(dlon/2)**2)

        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        distance_m = (R * c) / 1.609

    # create Location object
        loc = Location(place["name"], distance_m)
        loc.lat = place_lat
        loc.lng = place_lng

    # append to list
        locations.append(loc)

# ---------------------------------------------------
# DISPLAY LOCATIONS
# ---------------------------------------------------

print("\nAvailable Locations:\n")

for i, loc in enumerate(locations):
    name = loc.place_name
    distance = round(loc.distance_m, 2)
    
    # Default message if hours are not available
    hours_text = ", ".join(loc.hours) if loc.hours else "Hours unavailable"
    print(f"{i+1}) {loc.place_name} - {round(loc.distance_m,2)} miles - {hours_text}")
    



# ---------------------------------------------------
# USER SELECTS LOCATION
# ---------------------------------------------------

choice = int(input("\nSelect a location number: ")) - 1

selected_location = locations[choice]

print("\nSelected:", selected_location.place_name)

