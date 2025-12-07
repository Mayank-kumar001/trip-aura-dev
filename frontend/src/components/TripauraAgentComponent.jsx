import React from 'react'
import { createSession, generateTemporaryKey } from '../utils/voiceAgentTools'
import { get_nearby_places } from '../utils/geoTool';

async function getUserLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  } catch (error) {
    console.error("Location error:", error);
    return null; // or throw error if you want
  }
}

const startSession = async() => {
  // const tempKey = await generateTemporaryKey()
  // console.log(tempKey)
  // await createSession(tempKey)
  // console.log('hello world')
  // const pos = await getUserLocation()
  // console.log(pos);
  const data = await get_nearby_places({ lat: 28.714759, lng: 77.1370003, category: 'catering.restaurant' });
  console.log(data)
}

function TripauraAgentComponent() {
  return (
    <div className='min-h-screen bg-neutral-900 flex justify-center items-center'>
      {/* <button onClick={startSession} className='bg-neutral-200 px-6 py-2 rounded-lg cursor-pointer font-semibold hover:scale-105 hover:bg-white '>Go Tripaura</button> */}
      <button className="w-52 h-16 relative">
  <div className="w-full h-full flex justify-center items-center bg-[rgb(255,255,238)] rounded-4xl px-8 py-2 text-lg outline-[rgb(36,38,34)] relative z-20">
    Click me
  </div>

  <div className="w-full h-full bg-[rgb(229,229,199)] rounded-4xl px-8 py-2 text-lg outline-[rgb(36,38,34)] absolute top-2.5 left-0 z-10"></div>
</button>

    </div>
  )
}

export default TripauraAgentComponent