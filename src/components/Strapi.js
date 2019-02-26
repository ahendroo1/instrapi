import React, { Component } from 'react';
import axios from 'axios';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// import { Card } from 'primereact/components/card/Card';
import { Dialog } from 'primereact/components/dialog/Dialog';
import { Button } from 'primereact/components/button/Button';
import {ListBox} from 'primereact/listbox';

class Strapi extends Component {

    constructor() {
        super();
        this.state = {
          strapi: [],
          characters: [],
        }
        
        // this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    onClick(title, episode_id, director, producer, release_date) {

        this.componentDidMount()
        this.setState({
            visible: true,
            title_movie: title,
            episode_id_movie: episode_id,
            director_movie: director,
            producer_movie: producer,
            release_date_movie: release_date
        });

    }

    onHide(event) {
        this.setState({visible: false});
    }

    componentDidMount() {

        axios.get('https://swapi.co/api/films/')
        .then((response_strapi) => {
            console.log(response_strapi.data.results)
            this.setState({  strapi: response_strapi.data.results })
        })
    }

    onCharacters(chr){

        this.setState({characters: []})
        console.log(chr)
        if(chr === 'x'){
            this.setState({characters: []})
        }else{
            var char_data = this.state.strapi[chr].characters ;

            var i;
            var arr = [];
            for (i = 0; i < char_data.length; i++) { 
                axios.get(this.state.strapi[chr].characters[i])
                .then((response_character) => {
                    // console.log(response_character.data)
                    arr.push(response_character.data)
                    // console.log(this.state.characters)
                    return this.setState({characters: arr})
                })
            }  
        }
       
    }

    


    render() {
        var numb = 0 ;
        const dataMovie = this.state.strapi.map((item, index) => {
            var title = item.title;
        
            return (
                <option value={numb++} >{title}</option>
                // </div>
            )
        })

        const charactersData = this.state.characters.map((res, i) => {
            var nama = res.name;
        
            return (
                <li key={i}><p>{res.name}</p></li>
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
                                {/* {dataMovie} */}
                                <select class="custom-select" value={this.state.value}  onChange={(e) => this.onCharacters(e.target.value)}>
                                    <option value="x" selected>Choose...</option>
                                    {dataMovie}
                                </select>

                                {/* <button class="btn btn-primary" onClick={() => this.onStateChar(this.state.characters)} >State</button> */}
                                
                        </center>

                        <ul style={{color: "white", padding: "20px"}}>{charactersData}</ul>

                        {/* <Dialog header={this.state.title_movie} visible={this.state.visible} style={{width: '50vw'}} footer={footer} onHide={this.onHide} maximizable>
                            <h4>{this.state.director_movie}</h4>
                            <p>{this.state.producer_movie}</p>
                            <p>{this.state.release_date_movie}</p>
                        </Dialog> */}


                        {/* <h3 className="first">Single</h3> */}
                        {/* <ListBox value={this.state.characters} options={this.state.characters} onChange={(e) => this.setState({characters: e.value})} optionLabel="name"/>
                     */}

                    </div>
            </div>
        );
    }
}

export default Strapi;