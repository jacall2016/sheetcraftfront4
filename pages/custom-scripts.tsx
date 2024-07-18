import React, { useState } from 'react';

const scriptChoices = [
  { value: 'test', label: 'Test Script' },
  { value: 'compile_flip700', label: 'Compile Flip700 Script' },
  { value: 'compile_yemk', label: 'Compile Yemk Script' },
  { value: 'compile_phl', label: 'Compile Phl Script' },
  { value: 'compile_live', label: 'Compile Live Script' },
  { value: 'concatenate_analysis', label: 'Concatenate Analysis Script' },
  { value: 'analysis_yemk_phl_live', label: 'Analysis Yemk PHL Live Script' },
  { value: 'analysis_flip700_phl_live', label: 'Analysis Flip700 PHL Live Script' },
];

const CustomScripts = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setShowWarning(false);
  };

  const handleScriptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScript(e.target.value);
    setShowWarning(false);
  };

  const handleGenerate = () => {
    if (!selectedFiles || !selectedScript) {
      setShowWarning(true);
      return;
    }
    // Add logic to handle file and script processing
    setGeneratedContent(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 bg-opacity-70">
      <div className="bg-primary bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-4xl text-light">
        <h1 className="text-4xl font-heading mb-4">Custom Scripts</h1>
        <div className="flex flex-col items-center mb-8">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mb-4 p-2 border rounded bg-light text-secondary"
          />
          {selectedFiles && (
            <div className="mb-4">
              <h2 className="mb-2">Selected Files:</h2>
              <ul>
                {Array.from(selectedFiles).map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <select
            onChange={handleScriptChange}
            className="mb-4 p-2 border rounded bg-light text-secondary"
          >
            <option value="" className="text-dark">Select Script</option>
            {scriptChoices.map((choice) => (
              <option key={choice.value} value={choice.value} className="text-dark">
                {choice.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleGenerate}
            className="p-2 rounded bg-highlight text-light font-bold"
          >
            Generate
          </button>
          {showWarning && (
            <div className="text-red-600 mt-4">
              Please select files and a script.
            </div>
          )}
        </div>
        {generatedContent && (
          <div className="flex flex-col items-center mt-8">
            <button
              onClick={() => console.log('Downloading...')}
              className="p-2 rounded bg-highlight text-light font-bold"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomScripts;
