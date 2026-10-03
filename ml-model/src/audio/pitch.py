import librosa
import numpy as np

audio, sr = librosa.load(
    "data/raw/healthy/healthy1.wav",
    sr=None
)

pitch = librosa.yin(
    audio,
    fmin=50,
    fmax=400
)

print(np.mean(pitch))