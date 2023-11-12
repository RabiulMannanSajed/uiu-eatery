import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
// import googleLocationicon from '../../Image/googleLocationIcon.png';
const MyLocation = () => {
    const center = [23.79787306203222, 90.44978509846945] /// this is the (lat,lan) value of you location
    return (
        <MapContainer
            center={center}
            zoom={15}
            style={{ width: '500px', height: '250px', alignItems: 'center', justifyContent: 'center' }} // size of the map 
        >
            <TileLayer

                // those value find in the React-leaflet
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></TileLayer>
            <Marker
                // to show the marker
                position={center} >
                <Popup>
                    A pretty  <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>

    );
};

export default MyLocation;