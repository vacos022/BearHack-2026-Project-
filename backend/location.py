import requests
import math
from dotenv import load_dotenv
import os
import json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv("keys.env")

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("API_KEY")
url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

SPREADSHEET_ID = "1a5RK7X9U-Sv6kKhrcr5o2x4ttB2MyJg6_b5yYeMv6qc"
RANGE_NAME = "Sheet1!A1:L1000"
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

creds = Credentials.from_service_account_file("credentials.json", scopes=SCOPES)
service = build("sheets", "v4", credentials=creds)


class Location:
    def __init__(self, place_name, distance_m, hours=None):
        self.place_name = place_name
        self.distance_m = distance_m
        self.hours = hours


@app.route("/api/search", methods=["POST"])
def search():
    data = request.get_json()

    keyword       = data["servicesNeeded"]
    user_lat      = float(data["latitude"])
    user_lng      = float(data["longitude"])
    radius_miles  = float(data["radius"])
    radius_meters = int(radius_miles * 1609)

    params = {
        "location": f"{user_lat},{user_lng}",
        "radius":   radius_meters,
        "keyword":  keyword,
        "key":      API_KEY,
    }

    # ── Google Maps request ───────────────────────────────────────────────────
    response  = requests.get(url, params=params)
    places_data = response.json()

    R = 6371.0
    locations = []

    for place in places_data.get("results", []):
        place_lat = place["geometry"]["location"]["lat"]
        place_lng = place["geometry"]["location"]["lng"]

        dlat = math.radians(place_lat - user_lat)
        dlon = math.radians(place_lng - user_lng)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(user_lat)) *
             math.cos(math.radians(place_lat)) *
             math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        distance_m = (R * c) / 1.609

        loc = Location(
            place_name=place["name"],
            distance_m=distance_m,
            hours=place.get("opening_hours", {}).get("weekday_text"),
        )
        loc.lat = place_lat
        loc.lng = place_lng
        locations.append(loc)

    # ── Sheet lookup ──────────────────────────────────────────────────────────
    sheet  = service.spreadsheets()
    result = sheet.values().get(
        spreadsheetId=SPREADSHEET_ID,
        range=RANGE_NAME
    ).execute()

    rows = result.get("values", [])
    sheet_lookup = {}
    for row in rows[1:]:
        if len(row) >= 11:
            fac_name = row[4].strip().lower()
            phone    = row[10]
            sheet_lookup[fac_name] = phone

    # ── DEBUG: print what we're comparing ────────────────────────────────────
    print("\n=== SHEET KEYS (first 20) ===")
    for k in list(sheet_lookup.keys())[:20]:
        print(f"  SHEET: '{k}'")

    print("\n=== GOOGLE PLACES NAMES ===")
    for loc in locations:
        print(f"  PLACES: '{loc.place_name.strip().lower()}'")

    # ── Filter to in-network only ─────────────────────────────────────────────
    filtered_locations = []
    for loc in locations:
        name_key = loc.place_name.strip().lower()
        if name_key in sheet_lookup:
            loc.phone = sheet_lookup[name_key]
            filtered_locations.append(loc)

    # ── Build JSON response ───────────────────────────────────────────────────
    results = []
    for loc in filtered_locations:
        results.append({
            "name":     loc.place_name,
            "distance": round(loc.distance_m, 2),
            "phone":    loc.phone,
            "hours":    loc.hours,   # ← add this
            "covered":  True,
        })
    
    for i, loc in enumerate(results, start=1):
        print(f"{i}) {loc['name']}")
        print(f"Distance: {loc['distance']} miles")
        print(f"Phone: {loc['phone']}")
        print(f"Hours: {loc['hours']}\n")

    print(f"\n[search] returning {len(results)} in-network locations")
    return jsonify({"results": results})



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)