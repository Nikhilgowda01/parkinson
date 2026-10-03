import librosa
import numpy as np

def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=None)

    mfccs = librosa.feature.mfcc(
        y=y,
        sr=sr,
        n_mfcc=13
    )

    mfcc_features = np.mean(mfccs.T, axis=0)

    pitches, magnitudes = librosa.piptrack(
        y=y,
        sr=sr
    )

    pitch = (
        np.mean(pitches[pitches > 0])
        if np.any(pitches > 0)
        else 0
    )

    zcr = np.mean(
        librosa.feature.zero_crossing_rate(y)
    )

    centroid = np.mean(
        librosa.feature.spectral_centroid(
            y=y,
            sr=sr
        )
    )

    features = np.hstack([
        mfcc_features,
        pitch,
        zcr,
        centroid
    ])

    metrics = {
        "fo": round(float(pitch), 2),

        "jitter": round(float(zcr), 4),

        "shimmer": round(float(np.std(np.abs(y))), 4),

        "hnr": round(
            float(
                20 * np.log10(
                    np.mean(np.abs(y)) /
                    (np.std(y) + 1e-6)
                )
            ),
            2
        ),

        "ppe": round(float(zcr * 10), 3),

        "rpde": round(float(np.var(y)), 3),

        "dfa": round(float(np.mean(np.abs(y))), 3)
    }

    return {
        "features": features,
        "metrics": metrics
    }