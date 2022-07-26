import React from 'react';
import { useState, useEffect} from 'react';
import './app.scss';
import BankService from './service/bankService'; 
import checkNumInputs from './modules/checkNumInputs';

const App = ({counter}) => {
	const [count, setCount] = useState(counter);
	const bankService = new BankService()
	const [courses, setCourses] = useState(updateCourses);
	let input = document.querySelector('input');

	useEffect(() => {
		checkNumInputs('input')
	}, [])

	const loadedCourses = (res) => {
		setCourses(res)
	}

	function updateCourses() {        
        bankService
            .getAllCourses()
			.then(res => loadedCourses(res));
			// .catch();
    }
	
	const onValueChange = (e) => {
		setCount(+Math.round(e.target.value));
	}

	const onCourseClick = (rate, cc) => {
		if (typeof(count) === 'string') {
			setCount(count)
		} else {
			setCount(Math.round(input.value / rate) + ` ${cc}`)
			input.value = '';
		}
	}

	return (
		<div className="app">
			<div className="counter">{count}</div>
			<div className="controls">
				<button onClick={() => onCourseClick(courses[1].rate, courses[1].cc)}>USD</button>
				<button onClick={() => onCourseClick(courses[2].rate, courses[2].cc)}>EUR</button>
				<button onClick={() => onCourseClick(courses[0].rate, courses[0].cc)}>GBP</button>
			</div>
			<input onInput={onValueChange}
				   type="text"
				   maxLength={10}
				   placeholder='Введите сумму в грн' />
		</div>
	)
}

export default App;