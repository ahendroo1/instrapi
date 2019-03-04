import React, { Component } from 'react';
import axios from 'axios';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Dialog } from 'primereact/components/dialog/Dialog';
import { Button } from 'primereact/components/button/Button';

class Strapi extends Component {

    constructor() {
        super();
        this.state = {
          strapi: [],
          characters: [],
          starship: [],
          pople: [],
          visible: false
        }

        this.onHide = this.onHide.bind(this);
    }

    onHide(event) {
        this.setState({visible: false});
    }

    componentDidMount() {

        axios.get('https://swapi.co/api/films/')
        .then((response_strapi) => {
            this.setState({  strapi: response_strapi.data.results })
        })
    }

    onCharacters(chr){

        this.setState({characters: []})

        if(chr === 'x'){
            this.setState({characters: []})
        }else{

            var char_data = this.state.strapi[chr].characters ;

            var i;
            var arr = [];
            for (i = 0; i < char_data.length; i++) { 
                axios.get(this.state.strapi[chr].characters[i])
                .then((response_character) => {
                    arr.push(response_character.data)
                    return this.setState({characters: arr})
                })
            }  
        }  
    }
    
    onStarship(star){

        this.setState({starship: []})
        if(star.length === 0){

            this.setState({visible:true, starship: [{"name": "Not Found"}]})

        } else {

            var arr = [];
            var i;
            for (i = 0; i < star.length; i++) { 
                axios.get(star[i])
                .then((response_starship) => {
                    arr.push(response_starship.data)
                    return this.setState({starship: arr, visible:true})
                })
            }
        }

    }

    render() {
        var numbMovie = 0 ;
        const dataMovie = this.state.strapi.map((item, index) => {
        
            return (
                <option value={numbMovie++} >{item.title}</option>
            )
        })

        const charactersData = this.state.characters.map((res, i) => {
        
            return (
                <li  onClick={() => this.onStarship(res.starships)}><p class="btn btn-warning"> {res.name}</p></li>
            )
        })

    
        const starshipData = this.state.starship.map((res, i) => {
            return (
                <p>{res.name}</p>
            )
        })

        const footer = (
            <div>
                <Button label="Close" icon="pi pi-times" onClick={this.onHide} className="p-button-danger" />
            </div>
        );
      
        return (
            <div className="Strapi">
                    <div class="container">
                        <center>
                            <h1 style={{color: 'white'}}>Movie Star Wars API</h1>
                            <p style={{color: "white", padding: "20px"}}>Amad Hendro</p>

                        </center>
                        <select class="custom-select" value={this.state.value}  onChange={(e) => this.onCharacters(e.target.value)}>
                            <option value="x" selected>Choose...</option>
                            {dataMovie}
                        </select>
            
                        <ul style={{color: "white", padding: "20px"}}>{charactersData}</ul>

                        <Dialog header="Starship" visible={this.state.visible} style={{width: '50vw'}} footer={footer} onHide={this.onHide} maximizable>
                            {starshipData}
                        </Dialog>

                    </div>
            </div>
        );
    }
}

export default Strapi;