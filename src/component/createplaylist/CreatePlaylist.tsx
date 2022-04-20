import React, { FC, useEffect } from 'react';
import { IPlaylist } from '../../pages/CreatePlaylistPage/CreatePlaylistPage';
import './CreatePlaylist.css';



type CreatePlaylistProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleValidation: (text: string) => boolean;
    newPlaylist: IPlaylist;
}


const CreatePlaylist: FC<CreatePlaylistProps> = (props: CreatePlaylistProps) => {

    
    //     // const text: string = props.newPlaylist.title;
    //     // console.log(text);
    //     // if (text.length <= 10) {
    //     //     return <p className='incorrect-val'>Title must be more than 10 character</p>
    //     // }
    //     // else {
    //     //     return <p className='correct-val'>Its good</p>
    //     // }
    // let validation
    // if(props.newPlaylist.title.length <= 10){
    //     const validation = <p className='incorrect-val'>Title must be more than 10 character</p>
    // }
    // else{
    //     const validation = <p className='correct-val'>Its good</p>
    // }


    return (
        <div className='wrapper'>
            <h1>Create your playlist!</h1>
            <div className="form-wrapper">
                <form onSubmit={() => props.handleSubmit}>
                    <h2>Enter New Playlist Title</h2>
                    <input name='title' type="text" id='title' onChange={props.handleText} placeholder='Min 10 Char' value={props.newPlaylist.title} />
                    {(!props.handleValidation(props.newPlaylist.title)) ? <p className='incorrect-val'>Title must be more than 10 character</p> : <p className='correct-val'>Its good</p>}
                    {/* {validation} */}
                    <h2>Enter New Playlist Description</h2>
                    <textarea name="description" value={props.newPlaylist.description} onChange={() => props.handleText}></textarea>
                    {(!props.handleValidation(props.newPlaylist.title)) ? 
                    <button type='submit' disabled>Submit</button>
                    : 
                    <button type='submit' >Submit</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CreatePlaylist;