import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./Sucursales.css";

const containerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "12px"
};

const xicotepec = {
  lat: 20.2763,
  lng: -97.9617
};

const necaxa = {
  lat: 20.2156,
  lng: -97.9895
};

function Sucursales() {
  return (
    <div className="sucursales-container">
      <h1 className="sucursales-title">Nuestras Sucursales</h1>

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        
        {/* Xicotepec */}
        <div className="sucursal-card">
          <h2>Xicotepec de Juárez</h2>
          <p>Centro, Xicotepec de Juárez, Puebla</p>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={xicotepec}
            zoom={15}
          >
            <Marker position={xicotepec} />
          </GoogleMap>
        </div>

        {/* Nuevo Necaxa */}
        <div className="sucursal-card">
          <h2>Nuevo Necaxa</h2>
          <p>Centro, Nuevo Necaxa, Puebla</p>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={necaxa}
            zoom={15}
          >
            <Marker position={necaxa} />
          </GoogleMap>
        </div>

      </LoadScript>
    </div>
  );
}

export default Sucursales;