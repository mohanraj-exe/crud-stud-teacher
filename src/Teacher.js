import axios from "axios";
import React from "react";
import './Styling.css';

class Teachers extends React.Component{

    constructor(){
        super()
        this.state = {
            teachers:[],
            name:'',
            age:'',
            dept:'',
            experience:'',
            salary:'',
            phone:'',
            address:'',
            id:''
        }
    }

    async componentDidMount(){
        // Read
        var response = await axios.get('https://620fad6fec8b2ee2834903e1.mockapi.io/teachers')
        
        await this.setState({ teachers: response.data })
        // console.log(response.data)
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async (e) =>{
        e.preventDefault()

        if(this.state.id){
            // Update
            var response = await axios.put(`https://620fad6fec8b2ee2834903e1.mockapi.io/teachers/${this.state.id}`,{
              name: this.state.name,
              age: this.state.age,
              dept: this.state.dept,
              experience: this.state.experience,
              salary: this.state.salary,
              phone: this.state.phone,
              address: this.state.address
            })

            var index = this.state.teachers.findIndex((row) => row.id === response.data.id)
            var teachers = [...this.state.teachers]
            teachers[index] = response.data

            this.setState({teachers, id:'',name:'', age:'', 
                            dept:'',experience:'',salary:'',
                            phone:'', address:''})
            // console.log(response)
        }
        else{
            // Create
            let response = await axios.post('https://620fad6fec8b2ee2834903e1.mockapi.io/teachers',{
                name: this.state.name,
                age: this.state.age,
                dept: this.state.dept,
                experience: this.state.experience,
                salary: this.state.salary,
                phone: this.state.phone,
                address: this.state.address
            })

            let teachers = [...this.state.teachers]
            teachers.push(response.data)
            this.setState({teachers, id:'',name:'', age:'', 
                            dept:'',experience:'',salary:'',
                            phone:'', address:''})
            // console.log(response)
        }
        
    }

    handleDelete = (id) => {
        // Delete
        axios.delete(`https://620fad6fec8b2ee2834903e1.mockapi.io/teachers/${id}`)

        var teachers = this.state.teachers.filter(row => row.id !== id)
        this.setState({teachers})
    }

    populateData = (id) =>{
        const selectedData = this.state.teachers.filter(row => row.id === id)[0]
        this.setState({
            id: selectedData.id,
            name: selectedData.name,
            age: selectedData.age,
            dept: selectedData.dept,
            experience: selectedData.experience,
            salary: selectedData.salary,
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

        <h2 style={{textAlign: "center"}}>Teacher Form</h2>
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

          <label style={{position: "relative"}}>Dept:</label> &nbsp;
          <input type="text" name="dept"
          value={this.state.dept}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <label style={{position: "relative"}}>Experience:</label> &nbsp;
          <input type="number" name="experience"
          value={this.state.experience}
          onChange={(e) => this.handleChange(e)}
          style={{position: "absolute", left: "112px"}}></input><br /><br />

          <label style={{position: "relative"}}>Salary:</label> &nbsp;
          <input type="number" name="salary"
          value={this.state.salary}
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
        <h2 style={{paddingLeft: "335px"}}>Teachers-Information</h2>
        <table border={1} style={{position: "absolute", left: "20px"}}>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Dept</td>
                    <td>Experience</td>
                    <td>Salary</td>
                    <td>Phone</td>
                    <td>Address</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {this.state.teachers.map(row =>
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.age}</td>
                        <td>{row.dept}</td>
                        <td>{row.experience}</td>
                        <td>{row.salary}</td>
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

export default Teachers;