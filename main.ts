/**
 * ----------------------------------
 * 
 * PRZYKLADOWY PROGRAM
 * 
 * ----------------------------------
 */
// Zapis do rejestru TCA8418
function zapiszRejestr (reg: number, wartosc: number) {
    let buf = pins.createBuffer(2)
buf[0] = reg
    buf[1] = wartosc
    pins.i2cWriteBuffer(TCA, buf, false)
}
// ODCZYT NACISNIETEGO KLAWISZA
function odczytajKlawisz () {
    let liczba2 = odczytajRejestr(0x03) & 0x0F
if (liczba2 == 0) {
        return ""
    }
    zdarzenie = odczytajRejestr(4)
    if ((zdarzenie & 0x80) == 0) {
        return ""
    }
    let kod = zdarzenie & 0x7F
rzad = Math.idiv(kod - 1, 10)
    kolumna = (kod - 1) % 10
    // MAPOWANIE TWOJEJ KLAWIATURY
    mapa = [
    "*0#D",
    "789C",
    "456B",
    "123A"
    ]
    if (rzad >= 0 && rzad < 4 && kolumna >= 0 && kolumna < 4) {
        return mapa[rzad].charAt(kolumna)
    }
    return ""
}
// SPRAWDZENIE, CZY JEST ZDARZENIE KLAWISZA
function czyKlawiszNacisniety () {
    let liczba = odczytajRejestr(0x03) & 0x0F
return liczba > 0
}
// INICJALIZACJA KLAWIATURY
function inicjalizujKlawiature () {
    zapiszRejestr(29, 15)
    zapiszRejestr(30, 15)
    zapiszRejestr(1, 1)
    zapiszRejestr(2, 31)
}
// Odczyt rejestru TCA8418
function odczytajRejestr (reg: number) {
    pins.i2cWriteNumber(
    TCA,
    reg,
    NumberFormat.UInt8BE,
    true
    )
    return pins.i2cReadNumber(TCA, NumberFormat.UInt8BE, false)
}
let klawisz = ""
let mapa: string[] = []
let kolumna = 0
let rzad = 0
let zdarzenie = 0
let TCA = 0
TCA = 52
inicjalizujKlawiature()
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    klawisz = odczytajKlawisz()
    if (klawisz != "") {
        basic.showString(klawisz)
    }
    basic.pause(30)
})
