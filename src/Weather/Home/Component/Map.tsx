import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"
interface MapTS{
    check:any
}
const Map:React.FC<MapTS>= ({check}) => {
    console.log(check);
    
  return (
    <div>
      <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: check?.lot||"", lng: check?.len||"" }}
        >
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));