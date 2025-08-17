from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json, os
from datetime import datetime

app = FastAPI(title="Euystacio Presence Mode API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PULSE_FILE = "pulses.json"
LOG_FILE = "logs.json"

def read_json(path):
    if not os.path.exists(path):
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.post("/api/pulse")
def add_pulse(pulse: dict):
    data = read_json(PULSE_FILE)
    pulse["timestamp"] = datetime.utcnow().isoformat()
    data.append(pulse)
    write_json(PULSE_FILE, data)
    return {"status": "ok", "pulses": len(data)}

@app.get("/api/pulses")
def get_pulses():
    return read_json(PULSE_FILE)

@app.post("/api/log")
def add_log(entry: dict):
    data = read_json(LOG_FILE)
    entry["timestamp"] = datetime.utcnow().isoformat()
    data.append(entry)
    write_json(LOG_FILE, data)
    return {"status": "ok", "logs": len(data)}

@app.get("/api/logs")
def get_logs():
    return read_json(LOG_FILE)
