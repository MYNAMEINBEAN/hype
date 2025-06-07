import requests

# Replace with your actual API key
HYPERBEAM_API_KEY = "sk_live_zzGSMfCLIzyTY9LAIpBO9RpDUzh-iLMU-PuCccrHCs0"

# Hyperbeam API endpoint to create a new session
url = "https://engine.hyperbeam.com/v0/vm"

# Optional: specify the URL you want the browser to open
data = {
    "url": "https://example.com"
}

# Headers with API key
headers = {
    "Authorization": f"Bearer {HYPERBEAM_API_KEY}",
    "Content-Type": "application/json"
}

# Send POST request to create a new VM session
response = requests.post(url, json=data, headers=headers)

# Check response
if response.status_code == 200:
    session_data = response.json()
    print("Hyperbeam session created successfully!")
    print("Embed URL:", session_data.get("embed_url"))
    print("Stream ID:", session_data.get("stream_id"))
    print("Session ID:", session_data.get("session_id"))
else:
    print("Failed to create session.")
    print("Status code:", response.status_code)
    print("Response:", response.text)
