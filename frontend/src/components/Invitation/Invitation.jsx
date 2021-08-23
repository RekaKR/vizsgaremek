import React, { useState } from 'react'

const Invitation = () => {
  const [isShow, setIsShow] = useState(false)
  return (
    <div className="invitation">
      <div className="inv-main-container">
        <img id="background-img" src="./img/background1.jpg" alt="Réka és Dani" />

        <h2 className="reka">Igent <span>mondott!</span></h2>
      </div>

      <div className="story">
        <h3>Hogy is történt ez?</h3>
        <p>Na szóval az úgy volt, hogy évekig vártam a kérdéssel, mert féltem, hogy nemet mond. Aztán egy hó mentes, kellemes téli napon elmentünk volna kirándulni a Mátrába. <span onClick={() => setIsShow(!isShow)}>{!isShow ? "[...]" : "x"}</span></p>

        {isShow &&
          <>
            <p>Mire felértünk gyűltek a felhők felettünk. Réka mondta, hogy "ajjaj", de én mondtam, hogy ugyan, nem fog esni, úgyhogy kiszálltunk, mentünk párszáz métert, majd azzal a lendülettel leszakadt az ég. Mi meg ott álttunk lengén öltözve.</p>
            <p>Utálom a hideget és a havat, szóval mondtam, hogy menjünk haza.</p>
            <p>Elindultunk visszafele a kocsihoz, de pár percen belül akkora hó lett és olyan hóesés, hogy nem láttunk és nem tudtunk visszamenni. Réka látott valami macskát mászkálni a hóban. Azt mondta, kövessük, biztos megy haza melegedni. Biztos voltam benne, hogy ott fagyunk meg, de mondom jól van, már úgy is mindegy.</p>
            <p>Szóval elkezdtük követni a macskát. Aztán a macska egyszercsak valami ajtóhoz ért. Közelebb mentünk és láttam, hogy valamiféle motel vagy mi volt. Elég családias volt az egész. Szóval bementünk.</p>
            <p>Megbeszéltük, hogy kiveszünk egy szobát. Erre azt mondták, hogy csak egy helyük van, amit általában nem szoktak kiadni, mert a macska mindig bemegy az ablakon és bent alszik, ezért csak barátok és rokonok szoktak oda jönni. Réka szeme itt csillant fel.</p>
            <p>Nyilván kivettük a szállást. Át is voltunk fagyva, meg nem is tudtunk volna hazamenni. Na mindegy.</p>
            <p>Bementünk, a cica már ott feküdt az ágyon. Na mondom jólvan, most az egyszer elengedem. Volt bent egy kandalló. Elég menő volt amúgy. Szóval gondoltam begyújtok, de le kellett menni fát kérni. Réka meg arra gondolt, szerez forrócsokit.</p>
            <p>Szóval lementünk együtt a recepcióra, kértünk fát, aztán megvettük az italt, majd megláttunk egy 100 forintos kacatos automatát.</p>
            <p>Olyan szépen nézett rám, mondom veszek Neki egyet.</p>
            <p>Ki is pörgettem, de teli volt a kezünk, szóval nem bontottuk ki, előbb felmentünk. Én begyújtottam, Réka engedett melegvizet a kádba és beült a forrócsokival a kezében.</p>
            <p>Szóval volt meleg ital, melegvíz, meleg kandalló. Minden oké volt. És akkor eszembejutott a kacat, amit vettünk. Odahoztam a kád mellé és kinyitottam. Egy műanyag gyűrű volt benne.</p>
            <p>Akkor ébredtem rá, hogy ennek kellett volna lennie az egyik legszörnyűbb napnak az életemben. Hideg is volt, a hó is esett. Egy macskát követtünk - mennyire beteg már. Még is imádtam ezt a kalandot.</p>
            <p>Szóval letérdeltem a kád mellé és megkérdeztem, hogy hozzám jön-e feleségül.</p>
            <p>A többit pedig tudjátok.</p>
          </>
        }
      </div>

      <div className="img-galery-second">
        <img src="./img/reka.jpg" alt="Réka" />
        <img src="./img/daniesreka4.jpg" alt="Réka és Dani" />
        <img src="./img/dani.jpg" alt="Dani" />
      </div>

      <div className="story">
        <h3>Az esküvőről?</h3>
        <p>Lépj be azzal az email címel, amit megadtál nekünk. Ha nem tudsz belépni, kérlek vedd fel velünk a kapcsolatot.</p>
        <p>Belépés utána a Profil menüpont alatt kérlek jelezz vissza legkésőbb Április végéig. Utána sajnos már nem tudunk számolni veled.</p>
        <p>A Szállás menüpontnál megadtunk pár lehetőséget a buli utána alvásra. Intézd el időben, amíg van hely!</p>
        <p>A Menetrend menüpont alatt láthatod a nagy nap részletes programját.</p>
      </div>
    </div>
  )
}

export default Invitation
