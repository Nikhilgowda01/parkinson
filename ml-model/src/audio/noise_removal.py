import librosa
import soundfile as sf

input_file = "data/raw/healthy/healthy1.wav"

audio, sr = librosa.load(input_file, sr=None)

audio_trimmed, _ = librosa.effects.trim(audio)

sf.write(
    "data/processed/healthy1_clean.wav",
    audio_trimmed,
    sr
)

print("Saved")