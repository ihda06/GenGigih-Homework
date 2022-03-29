import { Component } from "react";
import Albumcard from "../albumcard/Albumcard";
import Login from "../loginComponent/index";
const axios = require('axios').default;

// axios.<method> will now provide autocomplete and parameter typings


class Search extends Component{
    state ={
        login: false,
        keyword:"",
        tracks: [],
        token: ""
    }

    handleInput = (e)=>{
        this.setState({keyword: e.target.value})
    }

    handleSubmit = async()=>{
        try{
            const response = await axios.get("https://api.spotify.com/v1/search", {
                params: {
                    type: 'track',
                    q: this.state.keyword,
                    limit: 5
                },
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }

            })
            this.setState({
                tracks: response.data.tracks.items
            })
        }
        catch(e){
            alert("Kamu belum login")
            console.error(e)
        }

    }

    componentDidMount(){
        const url = localStorage.getItem("access_token");
        if( url !== null){
            this.setState({
                token: localStorage.getItem("access_token"),
                login: true
            })
        }
        else{
            this.setState({
                login: false
            })
        }
    }

    render(){
        return(
            <>
            
            <Login/>
            <br/>
            <input type="text"  onChange={this.handleInput}/>
            <button onClick={this.handleSubmit}>Cari</button>
            <h1>Hasil pencarian : {this.state.keyword}</h1>
            <br/>
            <div className="Album-container">

            {
                (this.state.login)?
                this.state.tracks.map((item) => (
                    <Albumcard
                    key={item.id}
                    albumName={item.album.name}
                    songName={item.name}
                    url={item.album.images[0].url}
                    artistName={item.artists[0].name}
                    />
                    
                    ))
                :
                <h1>Belum login</h1>
                    
           }
            </div>
            </>
        )
    }
}

export default Search;