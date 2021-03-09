import React from 'react';
import './PhotoRecord.css'

class PhotoRecord extends React.Component
{
    render() 
    {
        return  <div className='photorecord-row'>
                    <div className='photorecord-column image-col'>
                        <img src={this.props.image} alt="" width={120} height={80}></img>
                    </div>
                    <div className='photorecord-column data-col'>
                        <p>{this.props.lapTimestamp.format('h:mm:ss a')}</p>
                        { (this.props.lapTime !== "") ? <p>Lap time: {this.props.lapTime/1000}s</p> : <p></p> }
                    </div>
                    <button onClick={() => this.props.onDelete()}>Delete</button>
                </div>
    }
}

export default PhotoRecord;