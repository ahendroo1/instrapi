import React, { Component } from 'react';
import axios from 'axios';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Card } from 'primereact/components/card/Card';
import { Dialog } from 'primereact/components/dialog/Dialog';
import { Button } from 'primereact/components/button/Button';

class Movie extends Component {

    constructor() {
        super();
        this.state = {
          strapi: [],
          visible: false
        }
        
        // this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    onClick(judul, episode_id, director, producer, release_date) {

        this.componentDidMount()
        this.setState({
            visible: true,
            judul_movie: judul,
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
            console.log(response_strapi)
            this.setState({strapi: response_strapi.data.results})
        })
        
        
    }

    render() {

        const dataMovie = this.state.strapi.map((item, index) => {
            var judul = item.title;
            var opening_crawl = item.opening_crawl ;
        
            return (
                
                <div key={index} class="btn-clone" onClick={() => this.onClick(judul, item.episode_id, item.director, item.producer, item.release_date)}>                
                    {/* <button class="btn btn-primary" >{judul}</button> */}
                    <Card title={judul} subtitle={opening_crawl} style={{width: '100%'}} className="ui-card-shadow " >
                        {opening_crawl}
                    </Card>
                </div>
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
                            <h1>The Star Wars API</h1>
                                {dataMovie}
                                
                        </center>

                        <Dialog header={this.state.judul_movie} visible={this.state.visible} style={{width: '50vw'}} footer={footer} onHide={this.onHide} maximizable>
                            <h4>{this.state.director_movie}</h4>
                            <p>{this.state.producer_movie}</p>
                            <p>{this.state.release_date_movie}</p>
                        </Dialog>


                    </div>
            </div>
        );
    }
}

export default Movie;