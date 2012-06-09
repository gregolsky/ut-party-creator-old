
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
    
    $( "#cart" ).droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        drop: function( event, ui ) {
            var list = $(this).find("ul");
            var self = this;
            $(this).find( ".placeholder" ).remove();
            var item = $("<li class='eqItem' ></li>").html(ui.draggable.html());
            item.appendTo(list);
            
            var eqItemId = item.children(".itemId").text();
            var eqItem = Enumerable.From(Items).Single(function(x){ return x.id == eqItemId; });
            ViewModel.character().addItemToEquipment(eqItem);
            
            $("<a style='float: right;' ></a>")
            .text("Usuń")
            .click(function(){
                
                ViewModel.character().removeItemFromEquipment(eqItem);
                item.remove();
                
                if (list.children('li').length == 0){
                    list.append($('<li class="placeholder eqItem">Dodaj przedmioty</li>'));
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

function getAttribute(attrs, getter){
    return getter(attrs);
}

function mergeItem(buf, item){
    return buf ? buf + ", " + item : item;
}

function CharacterSheetCanvas(character, context, sheetImg, nr){
    var self = this;
    self.character = character;
    self.context = context;
    self.sheetImg = sheetImg;
    self.sy = nr * self.sheetImg.height;
    
    self.fillText = function(text, x, y){
        self.context.fillText(text, x, y + self.sy);
    };
    
    self.draw = function(){
        self.context.drawImage(self.sheetImg, 0, self.sy, self.sheetImg.width, self.sheetImg.height);
        var c = character;
        self.fillText(c.name(), 40, 55);
        var race = raceById(c.raceId());
        var rAttrs = race.attributes;
        var prof = professionById(c.professionId());
        self.fillText(race.name, 42, 92);
        self.fillText(prof.name, 40, 129);
        self.fillText(rAttrs.getCommand(), 20, 166);
        self.fillText(rAttrs.getMobility(), 52, 175);
        self.fillText(rAttrs.getNormalCombat(), 86, 184); 
        self.fillText(rAttrs.getStrength(), 121, 191);
        self.fillText(rAttrs.getCondition(), 152, 197);
        self.fillText(rAttrs.getRangeWeapons(), 189, 201);
        self.fillText(rAttrs.getToughness(), 230, 203);
        self.fillText(rAttrs.getVitality(), 262, 202);
        self.fillText(race.talent, 225, 45);
        self.fillText(prof.talent, 229, 104); 

        var wpnEq = c.weaponsEq().map(function(x){ return x.name });
        self._fillInLines(wpnEq, 200, 398, 48);

        var armEq = c.armorEq().map(function(x){ return x.name });
        self._fillInLines(armEq, 200, 404, 94);

        self.fillText("", 410, 143); //additional eq
        self.fillText(c.cost(), 601, 192);
    };

    self._fillInLines = function(items, width, x, y){
        var buf = "";
        var itemIdx = 0;
        var curLineIdx = 0;

        while (itemIdx < items.length){
            if (self.context.measureText(mergeItem(buf, items[itemIdx])).width > width)
            {
                self.fillText(buf, x, y + (curLineIdx * 15));
                curLineIdx++;
                buf = ""
            }

            buf = mergeItem(buf, items[itemIdx]);
            itemIdx++; 
        }

        if (buf){
            self.fillText(buf, x, y + (curLineIdx * 15));
        }
    }
}

function printTeamCharacterSheets(){
    
    if (!ViewModel || !ViewModel.team || ViewModel.team.characters().length == 0){
        return;
    }
    
    var characters = ViewModel.team.characters();
    var sheetWidth = 654;
    var sheetHeight = 239;
    
    var canvas = document.getElementById("charactersCanvas");
    $(canvas).attr("width", sheetWidth).attr("height", 239 * characters.length);
    
    var sheetImage = new Image();
    sheetImage.src = $("input[name=formImageData]").val();
    
    var context = canvas.getContext("2d");
    for (var i = 0; i < characters.length; i++){
        var charCanv = new CharacterSheetCanvas(characters[i], context, sheetImage, i);
        charCanv.draw();        
    }

    window.open(canvas.toDataURL('image/png'));
    
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

