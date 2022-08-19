import React, { useState } from "react";
import Papa from "papaparse";

const allowedExtensions = ["csv"];

const ReadFile = () => {
	
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	// It will store the file uploaded by the user
	const [file, setFile] = useState("");


	const handleFileChange = (e) => {
		setError("");
		
		// Check if user has entered the file
		if (e.target.files.length) {
			const inputFile = e.target.files[0];

			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}
			setFile(inputFile);
		}
	};
	const handleParse = () => {
		console.log("File:- ",file.name)
		// If user clicks the parse button without
		// a file we show a error
		if (!file) return setError("Enter a valid file");

		// Initialize a reader which allows user
		// to read any file or blob.
		const reader = new FileReader();
		
		// Event listener on reader when the file
		// loads, we parse it and set the data.
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;
			const columns = Object.keys(parsedData[0]);
			setData(columns);
            console.log("Data:- ",data)
		};
		reader.readAsText(file);
	};

	return (
		<div>
			<label htmlFor="csvInput" style={{ display: "block" }}>
				Enter CSV File
			</label>
			<input
				onChange={handleFileChange}
				id="csvInput"
				name="file"
				type="File"
			/>
			<div>
				<button onClick={handleParse}>Parse</button>
			</div>
			<div style={{ marginTop: "3rem" }}>
				{error ? error : data.map((row,
				idx) => <div key={idx}>{row}</div>)}
			</div>
		</div>
	);
};

export default ReadFile;
