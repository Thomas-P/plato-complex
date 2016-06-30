# Demo Time

Das Programm dient zur Vorführung im Kurs Pattern and Frameworks.
Es soll die Implementierung von Patterns zeigen, wobei neben der Nutzung
und Implementierung dieser auch weitere Randbedingungen erfüllt sein müssen. 

## Randbedingung

### Framework
[x] Framwork verwendet
[x] Anwendung kann begründet werden
[x] Anwendung verstanden
### Design Pattern
[x] mind. 2 Pattern
[x] begründet
[x] verstanden
### Asynchron
[x] asynchrone Aufrufe
[x] begründet
[x] Callbacks
### Code Style
[x] Kommentare
[x] Bezeichnungen
[x] Hohe Kohäsion
[x] Lose Kopplung
[x] Formatierung


## Funktionalität
Bei dem Programm handelt es sich um ein modulares System, welches in 
der Implementierung den Halstead Algorithmus zur Berechnung der Komplexität
einer Anwendung berechnet. Er basiert aus einem Baukastensystem, der
durch weitere Funktionalitäten und Reportfunktionen erweitert werden kann.
Hier zeigt sich die Anwendung des Adapter Design Pattern, wobei Parser,
Tree Walker und Analysesysteme flexibel gewechselt werden können.
Implementiert wurde hier nur gegen die Interfaces, womit es reicht,
diese unabhängig von der verwendeteten Technik zu implementieren, um 
die Funktionalität herzustellen.

Um die einzelnen Regeln zu implementieren werden sowohl das Command, als
auch das Strategie Pattern verwendet. Command um zu ermitteln, welcher
Strategiegenerator verwendet wird. Strategie entscheidet, wie der Walker weiterarbeitet.
 
Daneben bietet die Main Klasse eine Facade, wobei diese durch ein darüber
implementiertes Modul noch besser gestaltet werden soll.

Zusätzlich wird das Observer Pattern an verschiedenen Stellen implementiert,
wobei die Observer selbst streams darstellen, die man miteinander verknüpft.
 
Das JavaScriptspezifische Class Pattern, welches einen Objektbaukasten bieten,
findet ebenfalls Anwendung.

Daneben sind überall Singletons versteckt und da ich den Rest bereits
verwendet habe, habe ich da jetzt nicht weiter geschaut, diese noch einmal 
 implementieren zu müssen.

## Frameworks und Laufzeitumgebungen

- ESPrima (http://esprima.org/index.html)
- ReactiveX observable streams (http://reactivex.io/)
- TypeScript (http://www.typescriptlang.org/)
- Typings (TypeScript definitions)
- NodeJS (https://nodejs.org/en/)

## Imlementation

Repo clonen
`npm install`
`npm run demo`

## Was passiert

Das Projekt wird durchlaufen (hier jedoch die JavaScript Kompilate) und jede Datei einer Analyse unterzogen.
Hierbei werden die Dependencies dynamisch erkannt und darüber hinaus in den Analyseprozess mit eingebungen.
Am Ende kann man von der Datei und allen Abhängigkeiten die entsprechenden Metriken in der Datei metrics.json finden.



