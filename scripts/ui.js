
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
    
    self.costCalculationPolicy = new CharacterCostCalculationPolicy(self.team);
        
    self.character = new Character(ko.observable(), ko.observable(), ko.observable(), self.costCalculationPolicy);

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
        
    self.pointsAvailable = ko.computed(function(){
            return self.team.points() - self.team.cost();
        });
        
    self.addCharacter = function(){
        var data = self.character;
        var character = new Character(
            ko.observable(data.name()),
            ko.observable(data.raceId()), 
            ko.observable(data.professionId()),
            self.costCalculationPolicy);
            
        self.team.characters.push(character);
    }
    
}

