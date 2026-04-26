# Memory - Treball Individual DDJW

## Introduccio
El Memory web amb 2 modes de joc, opcions configurables,sistema de save/load i ranking. Fet amb HTML, CSS, JavaScript i Canvas, sobre la base del repositori https://github.com/u4000775/DDJW_2526.

## Disseny del joc
- Mode 1: el jugador tria numero de cartes, dificultat (Baixa/Normal/Alta) i mida de grup (parelles, trios o quartets). Un sol nivell.
  
- Mode 2: dificultat creixent. Cada nivell guanyat puja cartes, redueix temps i augmenta penalitzacio.
  
- Cartes: 6 dissenys SVG programats a ma i un revers.

## Implementacio
- memory.js conte tota la logica en un objecte game amb metodes select, start, click, save, applyOptions i guardarPunts.
  
- Estats per carta amb StateCard.DISABLE/ENABLE/DONE.
  
- localStorage per opcions, partides desades i ranking

- Multi-save: cada partida te id unic "p_<timestamp>" per poder guardar-ne moltes alhora.

- 6 cartes SVG programades a ma amb <style> intern (classes .carta, .lletra-m, .palo-X) i un revers diferent.

- Canvas: les cartes es distribueixen en un grid quadrat centrat per acceptar fins a 16+ cartes (Mode 2 alt).

## Conclusions i problemes trobats
- El merge amb la base nova del repositori va causar conflictes, i intentant resoldre'ls vaig estar a punt de perdre canvis de la P2. Per sort encara no havia pujat al remot i vaig poder recuperar-ho.

- De vegades sortien bugs aleatoris dificils de reproduir, com partides que no es podien acabar mai. Sembla que els he arreglat tots, pero abans em passava de tant en tant.

- El codi amb php em donava molts problemes i no volia haver de posar credencials d'Oracle + configuracio per que guardes la partida. Aixi que simplement ho guardo en un JSON en local.
