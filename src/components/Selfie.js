import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import Webcam from 'react-webcam'
import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { showToast } from '../App';

const Selfie=props=>{

    var width = window.innerWidth-50;
    var height = window.innerHeight-200;
    width=Math.min(width,height)
    height=width 


    const { webcamRef, boundingBox, isLoading, detected, facesDetected } = useFaceDetection({
        faceDetectionOptions: {
          model: 'short',
        },
        faceDetection: new FaceDetection.FaceDetection({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        }),
        camera: ({ mediaSrc, onFrame }) =>
          new Camera(mediaSrc, {
            onFrame,
            width,
            height,
          }),
      });

    
    const selfieClick=async ()=>{
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc)
        if(facesDetected===1)
            showToast('Selfie Taken Successfully')
        else if (facesDetected===0)
            showToast('No face found')
        else if(facesDetected>1)
            showToast('Multiple face error')
        else
            showToast('Camera is not ready yet')
    }
      

    return(
        <div style={{
            width:'100vw',
            height:'100vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <div style={{
                width:`${width+50}px`,
                display:'block'
            }}>
                <div open={true}>
                    <DialogTitle>
                        Make My Avatar <span
                            style={{
                                display:'inline-block',
                                height:'15px',
                                transform:'translateY(2px)',
                                borderRadius:'50%',
                                width:'15px',
                                backgroundColor:isLoading?'#aaaaaa':(facesDetected!==1?'red':'#00cf00')
                            }}/>
                    </DialogTitle>
                    <DialogContent>
                    <div style={{ width, height, position: 'relative',overflow:'hidden' }}>
                        {boundingBox.map((box, index) => (
                        <div
                            key={`${index + 1}`}
                            style={{
                            border: '4px solid red',
                            position: 'absolute',
                            top: `${box.yCenter * 100}%`,
                            left: `${box.xCenter * 100}%`,
                            width: `${box.width * 100}%`,
                            height: `${box.height * 100}%`,
                            zIndex: 1,
                            }}
                        />
                        ))}
                        <Webcam
                            ref={webcamRef}
                            forceScreenshotSourceSize
                            screenshotFormat="image/png"
                            style={{
                                height,
                                width,
                                position: 'absolute',
                            }}
                        />
                    </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color='primary'
                            variant='outlined'
                            onClick={selfieClick}
                            >
                            Take Selfie
                        </Button>
                    </DialogActions>
                </div>
            </div>
        </div>
    )
}

export default Selfie