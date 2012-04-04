
var Race = function(id, name, cost, availableNatures){
    var self = this;
    self.id = id;
    self.name = name;
    self.cost = cost;
    self.availableNatures = availableNatures;
}

var Profession = function(id, name, cost, onlyForHumans){
    var self = this;
    self.id = id;
    self.name = name;
    self.cost = cost
    self.onlyForHumans = onlyForHumans;
}

var Team = function(points, nature){
    var self = this;
    self.points = points;
    self.nature = nature;
    self.characters = ko.observableArray();
}

var Character = function(name, race, profession){
    var self = this;
    self.name = name;
    self.race = race;
    self.profession = profession;
    self.calculateCost = function(){
        return self.race.cost + self.profession.cost;
    }
    
    self.cost = ko.computed(function(){
        return self.race.cost + self.profession.cost;
    });
}

Professions = [
  new Profession(1, "Herszt", 70),
  new Profession(2, "Bard", 32),
  new Profession(3, "Szermierz", 40),
  new Profession(4, "Barbarzyńca", 36),
  new Profession(5, "Zbrojny", 38),
  new Profession(6, "Strzelec", 26),
  new Profession(7, "Zabójca", 44),
  new Profession(8, "Banita", 20),
  new Profession(9, "Łapserdak", 12),
  new Profession(10, "Palladyn", 65, true),
  new Profession(11, "Rycerz zakonny", 65, true),
  new Profession(12, "Czarny rycerz", 65, true),
  new Profession(13, "Szampierz", 39),
  new Profession(14, "Zwiadowca", 28),
  new Profession(15, "Tropiciel", 32),
  new Profession(16, "Berserker", 40),
  new Profession(17, "Giermek", 18),
  new Profession(18, "Złodziej", 16),
  new Profession(19, "Nożownik", 26),
  new Profession(20, "Hiena cmentarna", 16),
  new Profession(21, "Łowca nagród", 50),
  new Profession(22, "Mnich", 16),
  new Profession(23, "Strażnik dróg", 16),
  new Profession(24, "Rozbójnik", 25),
  new Profession(25, "Gladiator", 36),
  new Profession(26, "Mistrz miecza", 47),
  new Profession(27, "Zwadźca", 38),
  new Profession(28, "Czarodziej", 66),
  new Profession(29, "Kleryk", 60),
  new Profession(30, "Kapłan", 74),
  new Profession(31, "Druid", 63),
  new Profession(32, "Szaman", 62),
  new Profession(33, "Alchemik", 64)
]

Races = [
    new Race(1, "Elf leśny", 70, [ "D" ]),
    new Race(2, "Elf wyniosły", 70, [ "N" ]),
    new Race(3, "Elf dziki", 70, [ "N" ]),
    new Race(4, "Elf ciemny", 70, [ "Z" ]),
    
    new Race(5, "Krasnolud z Thargomind", 70, [ "N" ]),
    new Race(6, "Krasnolud z Północy", 73, [ "Z" ]),
    
    new Race(7, "Człowiek", 50, [ "D", "N", "Z" ]),
    
    new Race(8, "Ork", 60, [ "N", "Z" ]),
    
    new Race(9, "Niziołek Krótkin", 40, [ "D" ]),
    new Race(10, "Niziołek Mrokin", 40, [ "Z" ]),
    
    new Race(11, "Goblin", 38, [ "N", "Z" ]),
    new Race(12, "Hobgoblin", 45, [ "Z" ]),
    new Race(13, "Gnom", 36, [ "D" ]),
    new Race(14, "Półogr", 92, [ "D", "N" ]),
    new Race(15, "Czarny ork", 79, [ "Z" ]),
    new Race(16, "Tigerianin", 65, [ "D" ]),
    new Race(17, "Vorak", 64, [ "N" ])
]


