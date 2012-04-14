
var Race = function(id, name, cost, availableNatures){
    var self = this;
    self.id = id;
    self.name = name;
    self.cost = cost;
    self.availableNatures = availableNatures;
}

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

var Profession = function(id, name, cost, onlyForHumans){
    var self = this;
    self.id = id;
    self.name = name;
    self.cost = cost
    self.onlyForHumans = onlyForHumans;
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

function professionById(id){
    if (id){
        for (var i = 0; i < Professions.length; i++){
            if (Professions[i].id == id){
                return Professions[i];
            }
        }
    }
    
    return null;
}

function raceById(id){
    if (id){
        for (var i = 0; i < Races.length; i++){
            if (Races[i].id == id){
                return Races[i];
            }
        }
    }
    
    return null;
}

var CharacterCostCalculationPolicy = function(team){
    var self = this;
    self.team = team;
    self.calculate = function(character){
        var baseCost = character.calculateBaseCost();
        var extraProfessionCost = self.team.getCharacterExtraCost(character);
        return baseCost + extraProfessionCost;
    }
}

var Character = function(name, raceId, professionId, costCalculationPolicy){
    var self = this;
    self.name = name;
    self.raceId = raceId;
    self.professionId = professionId;
    self.costCalculationPolicy = costCalculationPolicy;

    self.calculateBaseCost = function(){
        var cost = 0;
        
        if (self.professionId()){
            var profession = professionById(self.professionId());
            cost += profession.cost;
        }
        
        if (self.raceId()){
            var race = raceById(self.raceId())
            cost += race.cost;
        }
        
        return cost;
    }

    self.cost = ko.computed(function(){
            if (!self.costCalculationPolicy){
                return 0;
            }
            
            return self.costCalculationPolicy.calculate(self);
        });
        
    self.equals = function(another){
        return self.name() == another.name() && 
               self.raceId() == another.raceId() &&
               self.professionId() == another.professionId();
    }
    
    self.setCostCalculationPolicy = function(policy){
        self.costCalculationPolicy = policy;
    }
}

var Team = function(points, nature){
    var self = this;
    self.points = points;
    self.nature = nature;
    self.characters = ko.observableArray();
    
    self.cost = ko.computed(function(){
        var result = 0;

        ko.utils.arrayForEach(
            self.characters(),
            function(character){
                result += character.cost();
            });
        
        return result;
    });
    
    self.getCharacterExtraCost = function(arg){
        if (!arg || !arg.professionId()){
            return 0;
        }
        
        var index = 0;
        var professionId = arg.professionId();
        var loopNoMore = false;
        ko.utils.arrayForEach(
            self.characters(),
            function(character){
                 
                 if (loopNoMore){
                     return false;
                 }
                 
                 if (character == arg){
                     loopNoMore = true;
                     return false;
                 }
                 
                 if (character.professionId() && character.professionId() == professionId){
                     index++;
                 }
            });
            
        return index * 10;
    }
}





