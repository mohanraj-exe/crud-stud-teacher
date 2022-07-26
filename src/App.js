import axios from "axios";
import React from "react";
import './Styling.css';

class Students extends React.Component{

    constructor(){
        super()
        this.state = {
            students:[],
            name:'',
            age:'',
            grade:'',
            parentName:'',
            occupation:'',
            phone:'',
            address:'',
            id:''
        }
    }

    async componentDidMount(){
        // Read
        var response = await axios.get('https://620fad6fec8b2ee2834903e1.mockapi.io/students')
        
        await this.setState({ students: response.data })
        // console.log(response.data)
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async (e) =>{
        e.preventDefault()

        if(this.state.id){
            // Update
            var response = await axios.put(`https://620fad6fec8b2ee2834903e1.mockapi.io/students/${this.state.id}`,{
              name: this.state.name,
              age: this.state.age,
              grade: this.state.grade,
              parentName: this.state.parentName,
              occupation: this.state.occupation,
              phone: this.state.phone,
              address: this.state.address
            })

            var index = this.state.students.findIndex((row) => row.id === response.data.id)
            var students = [...this.state.students]
            students[index] = response.data

            this.setState({students, id:'',name:'', age:'', 
                            grade:'', parentName:'',
                            occupation:'', phone:'', address:''})
            // console.log(response)
        }
        else{
            // Create
            let response = await axios.post('https://620fad6fec8b2ee2834903e1.mockapi.io/students',{
                name: this.state.name,
                age: this.state.age,
                grade: this.state.grade,
                parentName: this.state.parentName,
                occupation: this.state.occupation,
                phone: this.state.phone,
                address: this.state.address
            })

            let students = [...this.state.students]
            students.push(response.data)
            this.setState({students, id:'',name:'', age:'', 
                          grade:'', parentName:'',
                          occupation:'', phone:'', address:''})
            // console.log(response)
        }
        
    }

    handleDelete = (id) => {
        // Delete
        axios.delete(`https://620fad6fec8b2ee2834903e1.mockapi.io/students/${id}`)

        var students = this.state.students.filter(row => row.id !== id)
        this.setState({students})
    }

    populateData = (id) =>{
        const selectedData = this.state.students.filter(row => row.id === id)[0]
        this.setState({
            id: selectedData.id,
            name: selectedData.name,
            age: selectedData.age,
            grade: selectedData.grade,
            parentName: selectedData.parentName,
            occupation: selectedData.occupation,
            phone: selectedData.phone,
            address: selectedData.address
        })
        console.log(selectedData)
    }
    
render(){

    return(
        <>
        <div style={{border: "5px #04AA6D outset", 
                    position: "absolute", top: "80px",
                    left: "850px",  width: "400px",
                    margin:"5px",padding:"10px"}}>

        <h2 style={{textAlign: "center"}}>Student Form</h2>
        <form onSubmit={(e) => this.handleSubmit(e)} style={{display: "relative"}}>

          <label style={{position: "relative"}}>ID:</label> &nbsp;
          <input type="text" name="id"
          value={this.state.id}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <label style={{position: "relative"}}>Name:</label> &nbsp;
          <input type="text" name="name"
          value={this.state.name}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <label style={{position: "relative"}}>Age:</label> &nbsp;
          <input type="number" name="age"
          value={this.state.age}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <label style={{position: "relative"}}>Grade:</label> &nbsp;
          <input type="number" name="grade"
          value={this.state.grade}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <label style={{position: "relative"}}>ParentName:</label> &nbsp;
          <input type="text" name="parentName"
          value={this.state.parentName}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <label style={{position: "relative"}}>Occupation:</label> &nbsp;
          <input type="text" name="occupation"
          value={this.state.occupation}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <label style={{position: "relative"}}>Phone:</label> &nbsp;
          <input type="number" name="phone"
          value={this.state.phone}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <label style={{position: "relative"}}>Address:</label> &nbsp;
          <input type="text" name="address"
          value={this.state.address}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <button type="submit" style={{position: "absolute", left:"112px"}}>Submit</button> &nbsp;
          <button style={{position: "absolute", left:"224px"}}>Reset</button>  

          </form><br /><br /> 
      </div>
                
      <div style={{position: "relative"}}>
        <h2 style={{paddingLeft: "335px"}}>Students-Information</h2>
        <table border={1} style={{position: "absolute", left: "20px"}}>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Grade</td>
                    <td>ParentName</td>
                    <td>Occupation</td>
                    <td>Phone</td>
                    <td>Address</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {this.state.students.map(row =>
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.age}</td>
                        <td>{row.grade}</td>
                        <td>{row.parentName}</td>
                        <td>{row.occupation}</td>
                        <td>{row.phone}</td>
                        <td>{row.address}</td>
                        <td>
                            <button onClick={()=>this.populateData(row.id)}>Edit</button> &nbsp;
                            <button onClick={()=>this.handleDelete(row.id)}>Delete</button>
                        </td>   
                    </tr>
                )}
            </tbody>
        </table>

        </div>
        
        </>
    )
}
}

export {Students}