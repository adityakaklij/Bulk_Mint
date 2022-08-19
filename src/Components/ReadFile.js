import React, { useState } from "react";
import Papa from "papaparse";

const allowedExtensions = ["csv"];

const ReadFile = () => {
    const [parsedData, setParsedData] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [values, setValues] = useState([]);


	
	const changeHandler = (e)=>{
        console.log("e.target.value[0]",e.target.files[0]);

        Papa.parse(e.target.files[0],{
            header:true,
            skipEmptyLines:true,
            complete: function(results){
                let p= (results.data).length
                let arr1 = []
                for(let i =0; i <= p; i++){
                    let m = ((results.data)[i]['add'])
                    // setParsedData(m)
                    console.log(m)
                    arr1.push(m)
                }
                setParsedData(arr1)
                console.log(parsedData)
                console.log("arr1:- ",arr1)
                // console.log((results.data)[0]['add'])
                const rowsArray = [];
        const valuesArray = [];

        
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

       

            },
        })
        // const reader = new FileReader();
        // const input = e.target.files[0]
        // console.log("input:- :",input)
    }

	return (
		<div>
			<input
                type="file"
                name= "file" accept=".csv"
                onChange={changeHandler}
            />
		</div>
	);
};

export default ReadFile;
