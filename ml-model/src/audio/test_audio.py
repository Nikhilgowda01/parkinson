import librosa
import os

files = [
    "data/raw/healthy/healthy1.wav",
    "data/raw/healthy/healthy2.wav",
    "data/raw/parkinson/parkinson1.wav"
]

for file in files:
    audio, sr = librosa.load(file, sr=None)

    print("\nFile:", os.path.basename(file))
    print("Sample Rate:", sr)
    print("Duration:", len(audio)/sr)