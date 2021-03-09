import React from 'react';
import Webcam from 'react-webcam';
import Moment from 'moment';
import PhotoRecord from './Components/PhotoRecord/PhotoRecord';
import './FrameCapture.css';
import PartialPhotoRecord from './Components/PartialPhotoRecord/PartialPhotoRecord';

class FrameCapture extends React.Component {

    state = {
        currentImageData: null,
        currrentImageTimestamp: null,
        lapList: [],
        queueList: [],
        customTime: ""
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        const currentTime = Moment();
        this.state.queueList.push(
            {
                image: imageSrc,
                timestamp: currentTime
            }
        )
        this.setState({lapList: this.state.lapList});
    }

    render() {
        return (
            <div className="container">

                <div className="largeColumn">
                    
                    <textarea onChange={(event) => this.setState({customTime: event.target.value})}></textarea>
                    <button className="photoButton" onClick={this.addCustomTime()}>Add Time</button>

                    <Webcam
                        audio={false}
                        height={360}
                        ref={this.setRef}
                        screenshotFormat={"image/jpeg"}
                        width={640}
                        videoConstraints= {{
                            width: 1280,
                            height: 720
                        }}
                    />
                    <br></br>
                    <button className="photoButton" onClick={this.capture}>Capture Photo</button>

                    {
                      this.state.queueList.map((value, index) => {
                          return <PartialPhotoRecord image={value.image} lapTimestamp={value.timestamp}
                                onAdd={() => this.addToLapList(index)}
                                onDelete={() => this.removeFromQueue(index)}></PartialPhotoRecord>
                      })  
                    }
                </div>

                <div className="smallColumn">
                {
                    this.state.lapList.map((value, index) => {

                       var seconds = "";
                       if (index !== 0)
                       {
                            var endDate = value.timestamp;
                            var startDate = (this.state.lapList[index-1]).timestamp;
                            console.log(endDate);
                            console.log(startDate);
                            seconds = (endDate.diff(startDate, "milliseconds"));
                       }

                       return <PhotoRecord image={value.image} lapTimestamp={value.timestamp} 
                        lapTime={seconds} onDelete={() => this.removeFromLapList(index)}></PhotoRecord>
                    })
                }
                </div>

            </div>
        )
    }

    addToLapList(index) {
        console.log("RAN ADD " + index);
        this.state.lapList.push(this.state.queueList[index]);
        this.state.lapList.sort(function(a,b) {
            if (a.timestamp > b.timestamp) {
                return 1
            } else {
                return -1
            }});
        this.setState({lapList: this.state.lapList});
        this.removeFromQueue(index);
    }

    removeFromQueue(index) {
        console.log("RAN DELETE " + index);
        this.state.queueList.splice(index,1);
        this.setState({queueList: this.state.queueList});
    }

    removeFromLapList(index)
    {
        this.state.lapList.splice(index, 1);
        this.setState({lapList: this.state.lapList});
    }

    addCustomTime() {
        console.log(this.state.customTime);
    }
}

export default FrameCapture;