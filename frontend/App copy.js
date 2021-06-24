import React, { useState, useEffect } from "react"

const App = () => {
  const [couple, setCouple] = useState(true)
  const [weddingP, setWeddingP] = useState(false)
  const [photographer, setPhotographer] = useState(false)
  const [guest, setGuest] = useState(false)

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setData(data.message))
  }, [])

  return (
    <div className="app">
      {/*<p>{!data ? "Loading..." : data}</p>*/}

      {/*Főoldal*/}
      <div>
        <h2>Meghívó</h2>
      </div>

      {
        (couple || weddingP || guest) &&
        <>
          {/*Listázza a személyes dolgokat*/}
          {/*KÜLSŐ API - GOOGLE NAPTÁRBA ADÁS*/}
          <div>
            <h2>Profil</h2>
            <p>Név</p>
            <p>+1 főt hoz-e</p>
            <p>Ha igen, kit.</p>
            <p>Ki mellett szeretne ülni.</p>
            <p>Add calendar</p>
          </div>

          {/*Esküvő menetrend*/}
          <div>
            <h2>Menetrend/Programok</h2>
          </div>

          {/*Szállás lehetőségek*/}
          <div>
            <h2>Szállás</h2>
          </div>

          {/*Hol ül az ember; ki mellett szeretne ülni funkció / + couple||weddingP -> ülés rend szerkesztése*/}
          <div>
            <h2>Ülésrend</h2>
          </div>
        </>
      }

      {
        (couple || weddingP || photographer || guest) &&
        <>
          {/*Képek az esküvőről / + photographer -> kép feltöltése, kép törlése / + couple||weddingP -> kép törlése*/}
          {/*KÜLSŐ API - AI AZONOSÍTÁS/ARC FELISMERÉS*/}
          {/*KÜLSŐ API - GOOGLE DRIVE-RA MENTÉS*/}
          <div>
            <h2>Képek</h2>
          </div>
        </>
      }

      {
        (couple || weddingP) &&
        <>
          {/*Listák, mik vannak kész*/}
          <div>
            <h2>Elintézni valók</h2>
            <input type="checkbox" />

            <h3>Ruha</h3>
            <p>Öltöny</p>
            <p>Menasszonyi ruha</p>
            <p>Csokor</p>
            <p>Gyűrű</p>

            <h3>Díszlet</h3>
            <p>Díszítés</p>
            <p>Virágok</p>
            <p>Teríték</p>
            <p>stb</p>

            <h3>Étel</h3>
            <p>Előétel</p>
            <p>Főétel</p>
            <p>Desszert</p>
            <p>Torta</p>
            <p>Hajnali kaja</p>
            <p>Másnapi brunch</p>
          </div>

          <div>
            {/*Menetrend/Programok, Szállás, meghívott lista/felhasználó hozzáadása - szerkesztés*/}
            <h2>Adatok feltöltése</h2>

            <h3>Meghívott lista</h3>
            <p>Meghívott lista (részletezve)</p>
            <p>Meghívott hozzáadása (profil létrehozása)</p>

            <h3>Szállás</h3>
            <p>Szállás lista</p>
            <p>Szállás hozzáadása</p>

            <h3>Menetrend/Programok</h3>
            <p>Menetrend/Programok lista</p>
            <p>Menetrend/Programok hozzáadása</p>
          </div>
        </>
      }
    </div>
  );
}

export default App
