# Webbsidan till restaurangen Hot 'N' Heavy

Detta är en webbsida för det fiktiva restaurangen Hot 'N' Heavy som används i samband med en backend applikation som skapats här: https://github.com/CalleAlexanderson/uppgift-1-server

## Uppbyggnad

Webbsidan består av två delar, två (tre om man räknar inloggningssidan) undersidor menade för kunder där det ingår en startsida samt en sida där menyn för restaurangen finns samt tre undersidor menade för anställda på restaurangen som är gjorda för att hantera menyn på olika sätt.

### Kundsidan
På startsidan ligger det det en sektion med information samt ett formulär användaren kan använda för att lämna en review, på sidan av skärmen finns en flik användaren kan dra ut för att se tidigare reviews som getts.
På menysidan genereras olika menyer dynamiskt bereoende på vilken användaren väljer, detta görs med JavaScript och data som hämtas genom backend applikationen.

### Sidorna för att hantera menyn
Denna del består av en sida där det ligger en kopia av menyn men med knappar på de olika rätterna som låter användaren ta bort de från den valda menyn, en sida där de rätter tagits bort ligger (samma format som tidigare sida) och om du trycker på en knapp läggs de tillbaka på menyn och tillslut en sida med ett formulär som låter användaren lägga till en ny rätt på sidan.
