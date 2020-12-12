import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';   // Needed for react-table 6
import Addcar from './Addcar';
import Editcar from './Editcar';
import Button from '@material-ui/core/Button';


function Carlist() {
    const [cars, setCars] = useState([]);

    // fetch data from the car backend
    useEffect(() => fetchData(), []);

    const fetchData = () => {
       fetch('https://carstockrest.herokuapp.com/cars')
       .then(response => response.json())
       .then(data => setCars(data._embedded.cars))
    }    

    const deleteCar = (link) => {
        fetch(link, {method: 'DELETE'})
	    .then(res => fetchData())
	    .catch(err => console.error(err))
    }

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(car)
        })
	    .then(res => fetchData())
	    .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(car)
        })
	    .then(res => fetchData())
	    .catch(err => console.error(err))
    }

    const columns = [
        { Header: 'Brand', accessor: 'brand'},
        { Header: 'Model', accessor: 'model'},
        { Header: 'Color', accessor: 'color'},
        { Header: 'Fuel', accessor: 'fuel'},
        { Header: 'Year', accessor: 'year'},
        { Header: 'Price', accessor: 'price'},
        { filterable: false, sortable: false, width: 100, accessor: '_links.self.href', 
          Cell: row => <Editcar updateCar={updateCar} car={row.original}/>
        },
        { filterable: false, sortable: false, accessor: '_links.self.href', 
          Cell: row => <Button variant="outlined" onClick={() => deleteCar(row.value)}>Delete</Button>
        }
    ]

   return (
    <div>
        <Addcar saveCar={saveCar} /> 
        <ReactTable
            defaultPageSize={10}
            filterable={true}
            data={cars}
            columns={columns}
        />
    </div>
   )
}
    
export default Carlist;