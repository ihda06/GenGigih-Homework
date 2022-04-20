
import './style.css'

const CreatePlaylist = ({handleSubmit, newPlaylist, handleText, handleValidation}) => {
    
    return (
        <div className='wrapper'>
            <h1>Create your playlist!</h1>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <h2>Enter New Playlist Title</h2>
                    <input name='title' type="text" id='title' onChange={handleText} placeholder='Min 10 Char' value={newPlaylist.title}/>
                    {(!handleValidation(newPlaylist.title))?<p className='incorrect-val'>Title must be more than 10 character</p>: <p className='correct-val'>Its good</p>}
                    <h2>Enter New Playlist Description</h2>
                    <textarea name="description" value={newPlaylist.description} onChange={handleText}></textarea>
            
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePlaylist;