import React from 'react';
import './PartialPhotoRecord.css'

class PartialPhotoRecord extends React.Component
{
    render() 
    {
        return  <div className='photorecord-row'>
                    <div className='photorecord-column image-col'>
                        <img src={this.props.image} alt="" width={120} height={80}></img>
                    </div>
                    <div className='photorecord-column data-col'>
                        <p>{this.props.lapTimestamp.format('h:mm:ss a')}</p>
                    </div>
                    <button onClick={() => this.props.onAdd()}>Add</button>
                    <button onClick={() => this.props.onDelete()}>Delete</button>
                </div>
    }
}

export default PartialPhotoRecord;