#Porjekto pavadinimas:
Komandos tikslų sekimo sistema

#Sistemos paskirtis:
Kuriama sistema skirta palengvinti komandos vadovams lengviau sekti ir vertinti komandos narių išsikeltus tikslus. Įmonėse komandos nariai turi išsikelti metinius ar kitą laiko tarpą truksiančius tikslus, tačiau tai dažnai būna daroma skirtingose vietose ir informacija gali pasimesti. Todėl šioje sistemoje duomenys bus centralizuoti.

#Funkciniai reikalavimai:
  4 rolės:
    •Administratorius
    •Komandos vadovas
    •Komandos narys
    •Svečias
    
  Registracija prisijungimas prie sistemos.
  Komandos sukūrimas, peržiūra, redagavimas, ištrynimas.
  Komandos narių pridėjimas, peržiūra, redagavimas, ištrynimas.
  Komandos narių tiklsų peržiūrėjimas ir vertinimas.
  Tiklsų sūkurimas, peržiūra, redagavimas, ištrynimas.
  
#Technologijų aprašymas:

Serveriniai daliai naudojama .NET 8 karkasas, kuris palaiko ASP.NET Core: Tai yra pagrindinė biblioteka, skirta kurti API. Middleware: .NET 8 naudoja middleware komponentus, kad apdorotų HTTP užklausas bei autentifikacijai. EF Core: Entity Framework Core leidžia lengvai dirbti su duomenų bazėmis, kadangi tai yra ORM karkasas.

React yra populiari JavaScript biblioteka, skirta kurti vartotojo sąsajas (UI), ypač vieno puslapio programoms (SPA).
React Router: Leidžia valdyti navigavimą programoje, kad būtų užtikrintas sklandus naršymas tarp skirtingų puslapių. Axios ir react-query client: Skirtas duomenų perdavimui tarp React UI ir serverinės dalies (API).

Azure SQL Database yra debesų kompiuterijos paslauga, teikianti SQL Server duomenų bazę kaip paslaugą.

Sistema bus talpinama Microsoft Azure debesijos platformoje.

#Github repozitorijos nuoroda:
https://github.com/UgniusSau/saitynai-TeamGoalSystem
