import React, { useState } from 'react'
// Sample for slicing the array into small array.
function Extra() {
	const [arrData, setArrData]= useState()

	const data = [{add: "1"},{add: "2"},{add: "3"},{add: "4"},{add: "5"},{add: "6"},{add: "7"},{add: "8"},{add: "9"},{add: "10"}]
		// let data = [{"add":1},{"add":2},{"add":3},{"add":4}]
		let arr1 = [];
		for(var i = 0; i < data.length; i ++){
		// console.log("data:- ", data[i]["add"])
			arr1.push(data[i]["add"])
			
		}

		function sliceArray(arr){
			const newArray=[];
			for(let i = 0; i < arr.length; i += 4){
				const chunk = arr.slice(i , i + 4)// just change 2 to 100
				newArray.push(chunk);
			}
			return (newArray);
		}

		function btn(){
			// sliceArray(arrData)
			console.log(sliceArray(arr1))
		}

  return (
	<>
		<h1>Line for not to console twice</h1>
		<button onClick={btn}> Get the sliced array </button>
	</>
  )
}

export default Extra