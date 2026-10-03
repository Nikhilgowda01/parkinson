import librosa
import numpy as np

file = "data/raw/healthy/healthy1.wav"

audio, sr = librosa.load(file, sr=None)

mfcc = librosa.feature.mfcc(
    y=audio,
    sr=sr,
    n_mfcc=13
)

features = np.mean(mfcc, axis=1)

print(features)