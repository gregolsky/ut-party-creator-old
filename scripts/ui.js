
var configureTeamNatureSelect = function(){
    $("select[name=teamNature]").change(function(){
            if ($(this).val() != ""){
                $("#characterForm").show();
            }
            else{
                $("#characterForm").hide();
                
            }
        });
}

var configureDynamicStyles = function(){
    $(".sectionContent").addClass("ui-corner-all");
}

var configureValidation = function(){
    $("form").validate();
    $("input, select").blur(function(){
       $(this).valid(); 
    });
}

function UtViewModel(){
    var self = this;

    self.team = new Team(ko.observable(), ko.observable())
    
    self.character = new Character(ko.observable(), ko.observable(), ko.observable())
    
    self.availableRaces = ko.computed(function(){
            var filteredRaces = [];
            var teamNature = self.team.nature();
            
            for (var i = 0; i < Races.length; i++){
                var r = Races[i];
                
                if (r.availableNatures.indexOf(teamNature) != -1){
                    filteredRaces.push(r);
                }
            }
            
            return filteredRaces;
        });
        
    self.availableProfessions = ko.observableArray(Professions);
    
    self.characterCost = ko.computed(function() {
            var cost = 0;
            
            if (self.character && self.character.profession()){
                cost += self.character.profession().cost;
            }
            
            if (self.character && self.character.race()){
                cost += self.character.race().cost;
            }
            
            return cost;
        });
        
    self.pointsAvailable = ko.computed(function(){
            var totalTeamCost = 0;
            ko.utils.arrayForEach(
                self.team.characters(),
                function(character){
                    totalTeamCost += character.calculateCost();
                });
            
            return self.team.points() - totalTeamCost;
        });
        
    self.addCharacter = function(){
        var data = self.character;
        var character = new Character(
            data.name(),
            data.race(), 
            data.profession());
            
        self.team.characters.push(character);
    }
    
}

