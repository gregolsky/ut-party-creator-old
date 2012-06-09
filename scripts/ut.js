
var Attributes = function(
    command,           //ld
    mobility,          //m
    normalCombat,      //ws
    strength,          //s
    condition,         //sp
    rangeWeapons,      //bs
    toughness,         //t
    vitality){         //w
        var self = this;
        self.command = command;
        self.mobility = mobility;
        self.normalCombat = normalCombat;
        self.strength = strength;
        self.condition = condition;
        self.rangeWeapons = rangeWeapons;
        self.toughness = toughness;
        self.vitality = vitality;
        
        self.getCommand = function(){ return self.command; };
        self.getMobility = function(){ return self.mobility; };
        self.getNormalCombat = function(){ return self.normalCombat; };
        self.getStrength = function(){ return self.strength; };
        self.getCondition = function(){ return self.condition; };
        self.getRangeWeapons = function(){ return self.rangeWeapons; };
        self.getToughness = function(){ return self.toughness; };
        self.getVitality = function(){ return self.vitality; };
    }

var Race = function(id, name, cost, availableNatures, attributes, talent){
    var self = this;
    self.id = id;
    self.name = name;
    self.cost = cost;
    self.availableNatures = availableNatures;
    self.attributes = attributes;
    self.talent = talent
}

Races = [
    new Race(1, "Elf leśny", 70, [ "D" ], new Attributes(7, 15, 7, 7, 8, 8, 7, 6), "Doskok"),
    new Race(2, "Elf wyniosły", 70, [ "N" ], new Attributes(7, 15, 7, 7, 8, 8, 7, 6), "Doskok"),
    new Race(3, "Elf dziki", 70, [ "N" ], new Attributes(7, 15, 7, 7, 8, 8, 7, 6), "Doskok"),
    new Race(4, "Elf ciemny", 70, [ "Z" ], new Attributes(7, 15, 7, 7, 8, 8, 7, 6), "Doskok"),
    
    new Race(5, "Krasnolud z Thargomind", 70, [ "N" ], new Attributes(7, 15, 7, 8, 6, 7, 8, 8), "Ogłuszanie"),
    new Race(6, "Krasnolud z Północy", 73, [ "Z" ], new Attributes(7, 15, 7, 8, 6, 7, 8, 8), "Ogłuszanie"),
    
    new Race(7, "Człowiek", 50, [ "D", "N", "Z" ], new Attributes(7, 15, 7, 7, 7, 7, 7, 7), "Instynkt obronny"),
    
    new Race(8, "Ork", 60, [ "N", "Z" ], new Attributes(6, 15, 6, 8, 6, 6, 8, 7), "Brutalność"),
    
    new Race(9, "Niziołek Krótkin", 40, [ "D" ], new Attributes(6, 20, 6, 6, 8, 7, 6, 5), "Braterstwo"),
    new Race(10, "Niziołek Mrokin", 40, [ "Z" ], new Attributes(6, 20, 6, 6, 8, 7, 6, 5), "Braterstwo"),
    
    new Race(11, "Goblin", 38, [ "N", "Z" ], new Attributes(6, 20, 6, 6, 8, 7, 6, 5), "Żywotność"),
    new Race(12, "Hobgoblin", 45, [ "Z" ], new Attributes(6, 15, 6, 7, 7, 7, 6, 7), "Przeznaczenie"),
    new Race(13, "Gnom", 36, [ "D" ], new Attributes(7, 15, 6, 6, 6, 8, 6, 7), "Wrodzona moc"),
    new Race(14, "Półogr", 92, [ "D", "N" ], new Attributes(5, 10, 6, 9, 5, 5, 9, 9), "Twarda skóra"),
    new Race(15, "Czarny ork", 79, [ "Z" ], new Attributes(5, 10, 6, 9, 5, 5, 8, 8), "Atak paszczą"),
    new Race(16, "Tigerianin", 65, [ "D" ], new Attributes(6, 15, 6, 8, 8, 5, 7, 7), "Powalenie"),
    new Race(17, "Vorak", 64, [ "N" ], new Attributes(6, 15, 7, 7, 8, 6, 7, 8), "Podstępny cios")
]

var Profession = function(id, name, cost, talent, onlyForHumans){
    var self = this;
    self.id = id;
    self.name = name;
    self.cost = cost
    self.talent = talent;
    self.onlyForHumans = onlyForHumans;
}

Professions = [
  new Profession(1, "Herszt", 70, "Wydawanie rozkazów"),
  new Profession(2, "Bard", 32, "Poetyckie kroniki"),
  new Profession(3, "Szermierz", 40, "Dwie bronie"),
  new Profession(4, "Barbarzyńca", 36, "Krzepa"),
  new Profession(5, "Zbrojny", 38, "Opancerzenie"),
  new Profession(6, "Strzelec", 26, "Strzał w ruchu"),
  new Profession(7, "Zabójca", 44, "Perfekcyjny atak"),
  new Profession(8, "Banita", 20, "Ucieczka"),
  new Profession(9, "Łapserdak", 12, ""),
  new Profession(10, "Palladyn", 65, "Aura inspiracji", true),
  new Profession(11, "Rycerz zakonny", 65, "Zakonna determinacja", true),
  new Profession(12, "Czarny rycerz", 65, "Aura śmierci", true),
  new Profession(13, "Szampierz", 39, "Zamaszyste cięcie"),
  new Profession(14, "Zwiadowca", 28, "Skradanie"),
  new Profession(15, "Tropiciel", 32, "Znawca tropów"),
  new Profession(16, "Berserker", 40, "Furia"),
  new Profession(17, "Giermek", 18, "Odwrócenie uwagi"),
  new Profession(18, "Złodziej", 16, "Doliniarstwo"),
  new Profession(19, "Nożownik", 26, "Zasztyletowanie"),
  new Profession(20, "Hiena cmentarna", 16, "Znawca nekropolii"),
  new Profession(21, "Łowca nagród", 50, "Wielka szansa"),
  new Profession(22, "Mnich", 16, "Znawca świątyń"),
  new Profession(23, "Strażnik dróg", 16, "Terenoznawstwo"),
  new Profession(24, "Rozbójnik", 25, "Atak z zaskoczenia"),
  new Profession(25, "Gladiator", 36, "Słaby punkt"),
  new Profession(26, "Mistrz miecza", 47, "Perfekcja"),
  new Profession(27, "Zwadźca", 38, "Zastawa"),
  new Profession(28, "Czarodziej", 66, "Rzucanie czarów"),
  new Profession(29, "Kleryk", 60, "Modlitwy"),
  new Profession(30, "Kapłan", 74, "Święta walka"),
  new Profession(31, "Druid", 63, "Magiczny menhir"),
  new Profession(32, "Szaman", 62, "Rytuał"),
  new Profession(33, "Alchemik", 64, "Eliksiry")
]

function _ItemType(){
    var self = this;
    self.Helmet = 1;
    self.Armor = 2;
    self.Shield = 3;
    self.Greaves = 4;
    self.MeleeWeapon = 5;
    self.RangedWeapon = 6;
}

ItemType = new _ItemType();

function Item(id, name, type, cost){
    var self = this;
    self.id = id;
    self.name = name;
    self.type = type;
    self.cost = cost;
}

function _ArmorClass(){
    var self = this;
    self.Light = 1;
    self.Heavy = 2;
}

ArmorClass = new _ArmorClass();

function ArmorProperties(armorClass){
    var self = this;
    self.armorClass = armorClass;
    self.canBeUsedBy = function(character){
        var eq = Enumerable.From(character.equipment());
        if (this.type == ItemType.Helmet &&
                eq.Any(function(x){
                                return x.type == ItemType.Helmet;
                }))
                {
                    return false;
                }
                        
        if (this.type == ItemType.Greaves &&
                eq.Any(function(x){
                                return x.type == ItemType.Greaves;
                }))
                {
                    return false;
                }

        if (this.type == ItemType.Armor &&
                eq.Any(function(x){
                                return x.type == ItemType.Armor;
                }))
                {
                    return false;
                }

        if (this.type == ItemType.Shield &&
                (eq.Any(function(x){
                                return x.type == ItemType.Shield || 
                                      (x.type == ItemType.MeleeWeapon && (x.isTwoHanded || x.isLight));
                }) || 
                eq.Where(function(x){ return x.type == ItemType.MeleeWeapon; }).Count() > 1))
                {
                    return false;
                }                                                             
        
        if (this.armorClass == ArmorClass.Heavy){
            var profession = professionById(character.professionId());
            if (profession){
                return profession.cost > 35;
            }
        }
        
        return true;
    };
}

function MeleeWeaponProperties(normalAttackMod, strengthAttackMod, precisionAttackMod, counterAttack, isTwoHanded, isLight){
    var self = this;
    self.normalAttackMod = normalAttackMod;
    self.strengthAttackMod = strengthAttackMod;
    self.precisionAttackMod = precisionAttackMod;
    self.counterAttack = counterAttack;
    self.isTwoHanded = isTwoHanded;
    self.isLight = isLight;
    self.canBeUsedBy = function(character){
        var eq = Enumerable.From(character.equipment());
        if (this.type == ItemType.MeleeWeapon &&
                (eq.Any(function(x){ return x.type == ItemType.MeleeWeapon && x.isTwoHanded; }) ||
                eq.Where(function(x){ return x.type == ItemType.RangedWeapon || 
                                             x.type == ItemType.MeleeWeapon || 
                                             x.type == ItemType.Shield; }).Count() > 1))
                {
                    return false;
                }
        
        if (this.isTwoHanded || this.isLight){
            if (eq.Any(function(x){ return x.type == ItemType.Shield; })){
                    return false;
                }
        }
        
        return true;
    };                
}

function RangedWeaponProperties(dmg, range, isArmorPiercing){
    var self = this;
    self.damage = dmg;
    self.range = range;
    self.isArmorPiercing = isArmorPiercing;
    self.canBeUsedBy = function(character){
        var eq = Enumerable.From(character.equipment());
        if (this.type == ItemType.RangedWeapon &&
             (eq.Any(function(x){ return x.type == ItemType.RangedWeapon; }) || 
             eq.Where(function(x){ return x.type == ItemType.MeleeWeapon; }).Count() > 1))
                {
                    return false;
                }
                
        return true;
    };
}

Items = [
    // Melee (normalAttackMod, strengthAttackMod, precisionAttackMod, counterAttack, isTwoHanded, isLight)
    $.extend(new Item(1, "Miecz", ItemType.MeleeWeapon, 11), new MeleeWeaponProperties(1, 0, 0, false, false, false)),
    $.extend(new Item(2, "Miecz krótki", ItemType.MeleeWeapon, 11), new MeleeWeaponProperties(1, 0, 0, false, false, false)),
    $.extend(new Item(3, "Miecz półtoraręczny", ItemType.MeleeWeapon, 15), new MeleeWeaponProperties(1, 1, -1, false, true, false)),
    $.extend(new Item(4, "Topór", ItemType.MeleeWeapon, 11), new MeleeWeaponProperties(0, 1, -2, false, false, false)),            
    $.extend(new Item(5, "Młot", ItemType.MeleeWeapon, 11), new MeleeWeaponProperties(0, 1, -2, false, false, false)),
    $.extend(new Item(6, "Miecz dwuręczny", ItemType.MeleeWeapon, 20), new MeleeWeaponProperties(0, 2, -2, false, true, false)),
    $.extend(new Item(7, "Topór dwuręczny", ItemType.MeleeWeapon, 20), new MeleeWeaponProperties(0, 2, -2, false, true, false)),
    $.extend(new Item(8, "Młot dwuręczny", ItemType.MeleeWeapon, 20), new MeleeWeaponProperties(0, 2, -2, false, true, false)),
    $.extend(new Item(9, "Sztylet", ItemType.MeleeWeapon , 5), new MeleeWeaponProperties(0, -3, 2, false, false, true)),
    $.extend(new Item(10, "Nóż", ItemType.MeleeWeapon, 5), new MeleeWeaponProperties(0, -3, 2, false, false, true)),
    $.extend(new Item(11, "Szabla", ItemType.MeleeWeapon, 14), new MeleeWeaponProperties(1, -1, 2, false, false, false)),
    $.extend(new Item(12, "Rapier", ItemType.MeleeWeapon, 14), new MeleeWeaponProperties(1, -1, 2, false, false, false)),
    $.extend(new Item(13, "Włócznia", ItemType.MeleeWeapon, 13), new MeleeWeaponProperties(1, -1, -1, true, false, false)),
    $.extend(new Item(14, "Halabarda", ItemType.MeleeWeapon, 17), new MeleeWeaponProperties(1, -1, -1, true, true, false)),
    $.extend(new Item(15, "Kostur", ItemType.MeleeWeapon, 5), new MeleeWeaponProperties(0, 0, -2, false, false, false)),
    $.extend(new Item(16, "Maczuga", ItemType.MeleeWeapon, 5), new MeleeWeaponProperties(0, 0, -2, false, false, false)),
    $.extend(new Item(17, "Pałka", ItemType.MeleeWeapon, 5), new MeleeWeaponProperties(0, 0, -2, false, false, false)),
    $.extend(new Item(18, "Widły", ItemType.MeleeWeapon, 5), new MeleeWeaponProperties(0, 0, -2, false, false, false)),
    $.extend(new Item(19, "Kij", ItemType.MeleeWeapon, 5), new MeleeWeaponProperties(0, 0, -2, false, false, false)),
    
    // Armor
    $.extend(new Item(20, "Hełm 'Łebka'", ItemType.Helmet, 4), new ArmorProperties(ArmorClass.Light)),
    $.extend(new Item(21, "Hełm garnczkowy", ItemType.Helmet, 7), new ArmorProperties(ArmorClass.Heavy)),
    $.extend(new Item(22, "Koszulka kolcza", ItemType.Armor, 4), new ArmorProperties(ArmorClass.Light)),
    $.extend(new Item(23, "Napierśnik płytowy", ItemType.Armor, 7), new ArmorProperties(ArmorClass.Heavy)),
    $.extend(new Item(24, "Nagolennik skórzany", ItemType.Greaves, 4), new ArmorProperties(ArmorClass.Light)),
    $.extend(new Item(25, "Nagolennik metalowy", ItemType.Greaves, 7), new ArmorProperties(ArmorClass.Heavy)),
    $.extend(new Item(26, "Tarcza stalowa", ItemType.Shield, 10), new ArmorProperties(ArmorClass.Heavy)),
    $.extend(new Item(27, "Tarcza drewniana", ItemType.Shield, 3), new ArmorProperties(ArmorClass.Light)),
    
    // Ranged
    $.extend(new Item(28, "Łuk", ItemType.RangedWeapon, 10), new RangedWeaponProperties(1, 60)),
    $.extend(new Item(29, "Kusza", ItemType.RangedWeapon, 16), new RangedWeaponProperties(1, 40), true),
    $.extend(new Item(30, "Proca", ItemType.RangedWeapon, 3), new RangedWeaponProperties(1, 30)),
    $.extend(new Item(31, "Strzelba krasnoludzka", ItemType.RangedWeapon, 22), new RangedWeaponProperties(2, 40)),
    $.extend(new Item(32, "Łuk elfów", ItemType.RangedWeapon, 19), new RangedWeaponProperties(1, 60))                                                 
];


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
        var baseCost = character.baseCost();
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
    self.equipment = ko.observableArray();

    self.baseCost = ko.computed(function(){
        var cost = 0;
        
        if (self.professionId()){
            var profession = professionById(self.professionId());
            cost += profession.cost;
        }
        
        if (self.raceId()){
            var race = raceById(self.raceId())
            cost += race.cost;
        }
        
        ko.utils.arrayForEach(self.equipment(), function(item){
            cost += item.cost;
        });
                
        return cost;
    });

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
    
    self.addItemToEquipment = function(item){
        self.equipment.push(item);
    }
    
    self.removeItemFromEquipment = function(item){
        self.equipment.remove(item);
    }
    
    self.weaponsEq = ko.computed(function(){
        return Enumerable.From(self.equipment())
            .Where(
                function(x)
                { 
                    return x.type == ItemType.MeleeWeapon ||
                           x.type == ItemType.RangedWeapon;
                }).ToArray();
        });
        
    self.armorEq = ko.computed(function(){
        return Enumerable.From(self.equipment())
        .Where(
            function(x)
            { 
                return x.type == ItemType.Helmet ||
                       x.type == ItemType.Armor ||
                       x.type == ItemType.Shield ||
                       x.type == ItemType.Greaves;
            }).ToArray();
        });        
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





