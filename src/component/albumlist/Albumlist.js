import Albumcard from '../albumcard/Albumcard';
import './style.css'

const Albumlist = ({ list, handleSelectedtrack, handleUnselectedTrack }) => {
    return (
        <div className='wrapper'>
            <h1>Select track to add to your playlist</h1>
            {/* THE ALBUM LIST COMPONENT IS FLEXBOX STYLING */}
            <div className='Album-container'>
                {
                    list.map((item) => (
                        <Albumcard
                            key={item.id}
                            data={item}
                            handleSelectedtrack={handleSelectedtrack}
                            handleUnselectedTrack={handleUnselectedTrack}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Albumlist;