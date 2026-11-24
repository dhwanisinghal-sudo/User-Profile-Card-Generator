# User Profile Card Generator

A Flask application that accepts a name, short bio, and image URL from a web form. JavaScript sends the details to the Python backend using an HTTP POST request. The backend validates the input and returns JSON; the frontend uses that response to display a profile card.

## Run in VS Code (Windows PowerShell)
```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```
Open http://127.0.0.1:5000

## API
`POST /api/profile` accepts JSON with `name`, `bio`, and `image_url`. It validates required fields, text lengths, and the image URL, then returns the profile data as JSON.
