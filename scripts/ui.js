
var configureDynamicStyles = function(){
    $(".sectionContent").addClass("ui-corner-all");
}

var configureUi = function(){
    $(".button").button();
    $("input[type=button]").button();
}

var configureValidation = function(){
    $("form").validate();
    $("input, select").blur(function(){
       $(this).valid(); 
    });
}

var configureEquipmentEditor = function(){
    
    $( "#availableItemsPanel" ).accordion({
            autoHeight: false,
            collapsible: true,
            active: -1
        });
    
    $( "#cart .list" ).droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        drop: function( event, ui ) {
            var self = this;
            $(this).find( ".placeholder" ).remove();
            var item = $("<li class='eqItem' ></li>").html(ui.draggable.html());
            item.appendTo(this);
            
            var eqItemId = item.children(".itemId").text();
            var eqItem = Enumerable.From(Items).Single(function(x){ return x.id == eqItemId; });
            ViewModel.character().addItemToEquipment(eqItem);
            
            $("<a style='float: right;' ></a>")
            .text("Usuń")
            .click(function(){
                
                ViewModel.character().removeItemFromEquipment(eqItem);
                item.remove();
                
                if ($(self).children('li').length == 0){
                    $(self).append($('<li class="placeholder eqItem">Dodaj przedmioty</li>'));
                }  
            }).appendTo(item);
        }
    }).sortable({
        items: "li:not(.placeholder)",
        sort: function() {
            // gets added unintentionally by droppable interacting with sortable
            // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
            $( this ).removeClass( "ui-state-default" );
        }
    });
}

function UtViewModel(){
    var self = this;

    self.team = new Team(ko.observable(), ko.observable())
    
    self.costCalculationPolicy = new CharacterCostCalculationPolicy(self.team);
        
    self.character = ko.observable(new Character(ko.observable(), ko.observable(), ko.observable(), self.costCalculationPolicy));

    self.availableRaces = ko.computed(function(){
            var teamNature = self.team.nature();
            var filteredRaces = Enumerable.From(Races)
                        .Where(function(x){
                            return x.availableNatures.indexOf(teamNature) != -1;
                        }).ToArray();
            
            return filteredRaces;
        });
        
    self.availableProfessions = ko.observableArray(Professions);
    
    self.availableMeleeWeapons = ko.computed(function(){
            return Enumerable.From(Items)
                .Where(function(x){
                    return x.type == ItemType.MeleeWeapon 
                            && x.canBeUsedBy(self.character());
                    }).ToArray();
        });
        
    self.availableRangedWeapons = ko.computed(function(){
            return Enumerable.From(Items)
                .Where(function(x){
                    return x.type == ItemType.RangedWeapon
                            && x.canBeUsedBy(self.character());
                    }).ToArray();
        });
                
    self.availableArmors = ko.computed(function(){
            return Enumerable.From(Items)
                .Where(function(x){
                    return (x.type == ItemType.Armor || 
                            x.type == ItemType.Helmet || 
                            x.type == ItemType.Shield || 
                            x.type == ItemType.Greaves)
                            && x.canBeUsedBy(self.character());
                    }).ToArray();
        });        
        
    self.pointsAvailable = ko.computed(function(){
            return self.team.points() - self.team.cost();
        });
        
    self.addCharacter = function(){
        var data = self.character();
        var character = new Character(
            ko.observable(data.name()),
            ko.observable(data.raceId()), 
            ko.observable(data.professionId()),
            self.costCalculationPolicy);
            
        ko.utils.arrayForEach(data.equipment(), function(e){
                character.equipment.push(e);
            });    
  
        self.team.characters.push(character);
    }
    
    self.removeCharacter = function(character){
        self.team.characters.remove(character);
    }
    
    self.setDraggable = function(){
            $( "#availableItemsPanel li" ).draggable({
                appendTo: "body",
                helper: "clone"
            });
    }
    
}

