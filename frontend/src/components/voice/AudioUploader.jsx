import { useRef, useState } from "react";
import { Upload, Check } from "lucide-react";
import { useVoiceApp } from "../../context/VoiceAppContext";

export default function AudioUploader() {
  const {
    activePatientId,
    patients,
    addSession,
  } = useVoiceApp();

  const fileInputRef = useRef(null);

  const [uploadedName, setUploadedName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const activePatient = patients.find(
    (p) => p.id === activePatientId
  );

  const canAnalyze = !!activePatientId;

  const handleFileUpload = async (event) => {
    console.log("UPLOAD TRIGGERED");

    const file = event.target.files?.[0];

    console.log("FILE:", file);

    if (!file || !canAnalyze) return;

    setUploadedName(file.name);
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("STATUS:", response.status);

const text = await response.text();

console.log("RAW RESPONSE:", text);

const result = JSON.parse(text);

console.log("RESULT:", result);

      if (!response.ok) {
        throw new Error("Prediction failed");
      }


      console.log("Prediction Result:", result);

      addSession({
  title: file.name.replace(/\.[^/.]+$/, ""),
  category: "Uploaded Audio File",
  patientId: activePatientId,
  duration: "00:00",

  audioUrl: URL.createObjectURL(file),
  hasAudio: true,

  prediction: result.prediction,

  healthyProbability:
    result.healthy_probability,

  parkinsonProbability:
    result.parkinson_probability,

  riskScore:
    result.parkinson_probability,

  clarityScore:
    result.healthy_probability,

  riskLevel:
    result.prediction === "Parkinson"
      ? "High Risk"
      : result.prediction === "Healthy"
      ? "Low Risk"
      : "Medium Risk",

  metrics:
    result.metrics || {
      jitter: 0,
      shimmer: 0,
      hnr: 0,
      ppe: 0,
      rpde: 0,
      dfa: 0,
      fo: 0
    },

  analysisSummary: `
Prediction: ${result.prediction}
Healthy: ${result.healthy_probability}%
Parkinson: ${result.parkinson_probability}%
`
})


    } catch (error) {
      console.error(error);
      alert("Backend prediction failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <div className="uploader-card glass-panel">
        <div>
          <p className="eyebrow neon-badge neon-badge-purple">
            AUDIO FILE INGESTION
          </p>

          <h3>Upload Speech File</h3>

          <p className="upload-desc">
            Drag & drop any WAV, MP3, or OGG recording for instant
            high-dimensional acoustic analysis.
          </p>
        </div>

        <div className="audio-patient-label">
          Selected patient:{" "}
          <b>{activePatient?.name || "None"}</b>
        </div>

        {!canAnalyze ? (
  <button
    className="primary-btn"
    onClick={() => {
      alert("Please create a patient first from the Patient Management section.");
    }}
  >
    Choose or register a patient first
  </button>
        ) : (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept=".wav,.mp3,.ogg"
              hidden
              onChange={handleFileUpload}
            />

            <div
              className="dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-icon-circle">
                <Upload size={22} />
              </div>

              <div className="dropzone-text">
                <b>
                  {isAnalyzing
                    ? "Analyzing..."
                    : "Click to browse audio files"}
                </b>

                <small>
                  Supports mono/stereo 44.1kHz / 48kHz audio up to
                  50MB
                </small>
              </div>
            </div>

            {uploadedName && (
              <div className="uploaded-badge">
                <Check size={16} />
                {uploadedName} processed successfully!
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .uploader-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-height: 280px;
        }

        .upload-desc {
          color: #8b92a7;
          font-size: 13px;
          margin-top: 8px;
        }

        .audio-patient-label {
          color: #9ee7ff;
          font-size: 13px;
        }

        .dropzone {
          width: 100%;
          min-height: 120px;
          border: 2px dashed rgba(157, 78, 221, 0.4);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          background: rgba(157, 78, 221, 0.05);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dropzone:hover {
          border-color: #9d4edd;
          background: rgba(157, 78, 221, 0.12);
        }

        .upload-icon-circle {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(157, 78, 221, 0.18);
          color: #b86cff;
        }

        .dropzone-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .dropzone-text b {
          color: white;
          font-size: 14px;
        }

        .dropzone-text small {
          color: #8b92a7;
          margin-top: 4px;
        }

        .uploaded-badge {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(0, 245, 212, 0.08);
          border: 1px solid rgba(0, 245, 212, 0.25);
          color: #00f5d4;
        }
      `}</style>
    </>
  );
}