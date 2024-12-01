# Projekto pavadinimas:
Komandos tikslų sekimo sistema

# Sistemos paskirtis:
Ši sistema skirta įmonėms, siekiančioms efektyviau valdyti ir sekti komandos narių tikslus. Komandos vadovai galės centralizuotai stebėti komandos veiklos progresą ir tikslus, užtikrindami, kad visi duomenys būtų vienoje vietoje, lengvai pasiekiami ir aiškiai struktūrizuoti. Sistemos dėka sumažės informacijos praradimo rizika, o tikslų kūrimo bei priežiūros procesai taps paprastesni ir efektyvesni. Komandos nariai galės nustatyti metinius arba kitų laikotarpių tikslus, juos koreguoti ir stebėti jų vykdymo eigą. Vadovai galės analizuoti progresą ir užtikrinti, kad visi įmonės darbuotojų tikslai būtų pasiekti.

# Sistemos reikalavimai
## Funkciniai reikalavimai:
Sistema palaiko tris roles:
- **Administratorius:** turi galimybę kurti ir valdyti visą sistemą.
- **Komandos vadovas:** atsakingas už savo komandos tikslų ir narių valdymą.
- **Svečias:** turi ribotą prieigą gali matyti tik neprisijungusio nario pagrindinį puslapį prisijungti arba registruotis.

Funkciniai reikalavimai:
- Registracija ir prisijungimas prie sistemos: sistemos naudotojai gali registruotis ir saugiai prisijungti.
- Komandos valdymas: komandos kūrimas, peržiūra, redagavimas ir šalinimas.
- Narių valdymas: nario kūrimas, peržiūra, redagavimas ir šalinimas.
- Tikslų valdymas: tikslo sukūrimas, peržiūra, redagavimas ir šalinimas.
- Sistema turi reaguoti į besikeičiantį lango dydį.
- Modaliniai langai turi turėti papildomą naudingą įrašo informaciją.

## Nefunkciniai reikalavimai:
- Antraštė, turinys ir poraštė yra skirtingo stiliaus ir funkcionalumo.
- Panaudoti animacijas pagyvinti svetainę.
- Panaudoti vektorines ikonas.
- Parinkti besiderinančias turinio spalvas.
- Elementų matomumas ir pasiekiamumas neturi būti apsunkintas.
- Įvedimo formos turi būti aiškios ir nuoseklios.

# Naudojamos technologijos
## Serverinė dalis:
- .NET 8 karkasas su ASP.NET Core API: moderni ir galinga biblioteka, užtikrinanti našų API kūrimą.
- EF Core (Entity Framework Core): leidžia patogiai dirbti su SQL duomenų bazėmis naudojant ORM technologiją.

## Klientinė dalis:
- React.js: viena populiariausių bibliotekų, skirtų dinamiškų vartotojo sąsajų kūrimui.
- React Router: užtikrina patogų navigavimą tarp skirtingų puslapių.
- Axios ir React Query: efektyviam duomenų perdavimui tarp kliento ir serverio.

## Debesų kompiuterijos platforma:
- Azure SQL Database: stabilus ir saugus sprendimas SQL duomenų bazėms debesijoje.
- Microsoft Azure: sistemos talpinimui ir valdymui pasirinkta debesų platforma.

# Github repozitorijos nuoroda:
[https://github.com/UgniusSau/saitynai-TeamGoalSystem](https://github.com/UgniusSau/saitynai-TeamGoalSystem)

# Diegimo diagrama
![image](https://github.com/user-attachments/assets/28f42b85-421d-4f49-ac2b-157e9f212f7d)

# Naudotojo sąsajos eskizai

![HomeLoginRegister](https://github.com/user-attachments/assets/86cbb1a5-9cbb-4a69-b844-a4f330e1daff)

![Team](https://github.com/user-attachments/assets/6ee4838b-97db-4f54-bd7a-4bd365620b28)

![Member](https://github.com/user-attachments/assets/a9a98a98-eef6-4a53-88ae-d06d45e8f5d5)

![Goal](https://github.com/user-attachments/assets/7a6e85ae-6013-4151-9db5-6bb45f883e96)


