'use client'
import { useState } from 'react';

export default function Ask() {
  const [question, setQuestion] = useState('');

  const handleInputChange = (e: any ) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(`Question submitted: ${question}`);
    // Here you can handle the question submission, e.g., send it to an API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-gray-700">
              Your Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border rounded"
              placeholder="Type your question here"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
